// ====================================================================
// XEP-0045: Multi-User Chat
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0045.html
// Version: 1.31.1 (2018-03-12)
//
// Additional:
// --------------------------------------------------------------------
// XEP-0249: Direct MUC Invitations
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0249.html
// Version: 1.2 (2011-09-22)
//
// --------------------------------------------------------------------
// XEP-0307: Unique Room Names for Multi-User Chat
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0307.html
// Version: 0.1 (2011-11-10)
// ====================================================================
import {
    addAlias,
    attribute,
    booleanAttribute,
    childAttribute,
    childBoolean,
    childEnum,
    childJIDAttribute,
    childText,
    dateAttribute,
    deepChildText,
    extendMessage,
    findAll,
    integerAttribute,
    JIDAttribute,
    multipleChildAttribute,
    splicePath,
    staticValue,
    text
} from '../jxt';
import {
    NS_DATAFORM,
    NS_MUC,
    NS_MUC_ADMIN,
    NS_MUC_DIRECT_INVITE,
    NS_MUC_OWNER,
    NS_MUC_UNIQUE,
    NS_MUC_USER
} from '../Namespaces';
const Protocol = [
    addAlias(NS_DATAFORM, 'x', [{ path: 'iq.muc.form', selector: 'configure' }]),
    {
        defaultType: 'info',
        element: 'x',
        fields: {
            password: childText(null, 'password')
        },
        namespace: NS_MUC,
        path: 'presence.muc',
        type: 'join',
        typeField: 'type'
    },
    {
        aliases: [{ path: 'presence.muc.history', selector: 'join' }],
        element: 'history',
        fields: {
            maxCharacters: integerAttribute('maxchars'),
            maxStanzas: integerAttribute('maxstanzas'),
            seconds: integerAttribute('seconds'),
            since: dateAttribute('since')
        },
        namespace: NS_MUC
    },
    {
        aliases: ['presence.muc', 'message.muc'],
        defaultType: 'info',
        element: 'x',
        fields: {
            action: childEnum(null, ['invite', 'decline', 'destroy']),
            actor: splicePath(null, 'item', 'mucactor'),
            affiliation: childAttribute(null, 'item', 'affiliation'),
            jid: childJIDAttribute(null, 'item', 'jid'),
            nick: childAttribute(null, 'item', 'nick'),
            password: childText(null, 'password'),
            reason: deepChildText([
                { namespace: null, element: 'item' },
                { namespace: null, element: 'reason' }
            ]),
            role: childAttribute(null, 'item', 'role'),
            statusCodes: multipleChildAttribute(null, 'status', 'code')
        },
        namespace: NS_MUC_USER,
        type: 'info',
        typeField: 'type',
        typeOrder: 1
    },
    {
        element: 'actor',
        fields: {
            jid: JIDAttribute('jid'),
            nick: attribute('nick')
        },
        namespace: NS_MUC_USER,
        path: 'mucactor'
    },
    {
        element: 'destroy',
        fields: {
            jid: JIDAttribute('jid'),
            password: childText(null, 'password'),
            reason: childText(null, 'reason')
        },
        namespace: NS_MUC_USER,
        path: 'presence.muc.destroy'
    },
    {
        aliases: [{ path: 'message.muc.invite', multiple: true }],
        element: 'invite',
        fields: {
            continue: childBoolean(null, 'continue'),
            from: JIDAttribute('from'),
            reason: childText(null, 'reason'),
            thread: childAttribute(null, 'continue', 'thread'),
            to: JIDAttribute('to')
        },
        namespace: NS_MUC_USER
    },
    {
        element: 'decline',
        fields: {
            from: JIDAttribute('from'),
            reason: childText(null, 'reason'),
            to: JIDAttribute('to')
        },
        namespace: NS_MUC_USER,
        path: 'message.muc',
        type: 'decline'
    },
    {
        element: 'query',
        namespace: NS_MUC_ADMIN,
        path: 'iq.muc',
        type: 'user-list',
        typeField: 'type'
    },
    {
        aliases: [{ path: 'iq.muc.users', multiple: true, selector: 'user-list' }],
        element: 'item',
        fields: {
            affiliation: attribute('affiliation'),
            jid: JIDAttribute('jid'),
            nick: attribute('nick'),
            reason: childText(null, 'reason'),
            role: attribute('role')
        },
        namespace: NS_MUC_ADMIN
    },
    {
        aliases: ['iq.muc.users.actor'],
        element: 'actor',
        fields: {
            jid: JIDAttribute('jid'),
            nick: attribute('nick')
        },
        namespace: NS_MUC_ADMIN
    },
    {
        element: 'query',
        namespace: NS_MUC_OWNER,
        path: 'iq.muc',
        type: 'configure',
        typeField: 'type'
    },
    {
        aliases: [{ path: 'iq.muc.destroy', selector: 'configure' }],
        element: 'destroy',
        fields: {
            jid: JIDAttribute('jid'),
            password: childText(null, 'password'),
            reason: childText(null, 'reason')
        },
        namespace: NS_MUC_OWNER
    },
    // XEP-0249
    {
        element: 'x',
        fields: {
            action: staticValue('invite'),
            continue: booleanAttribute('continue'),
            jid: JIDAttribute('jid'),
            legacyReason: text(),
            password: attribute('password'),
            reason: attribute('reason'),
            thread: attribute('thread')
        },
        namespace: NS_MUC_DIRECT_INVITE,
        path: 'message.muc',
        type: 'direct-invite',
        typeOrder: 2
    },
    // XEP-0307
    {
        element: 'unique',
        fields: {
            name: text()
        },
        namespace: NS_MUC_UNIQUE,
        path: 'iq.muc',
        type: 'unique'
    },
    extendMessage({
        legacyMUC: {
            exporter(xml, value, context) {
                const out = context.registry
                    ? context.registry.export(
                          'message.muc',
                          Object.assign(Object.assign({}, value), { type: 'direct-invite' })
                      )
                    : undefined;
                if (out) {
                    xml.appendChild(out);
                }
            },
            exportOrder: 100001,
            importer(xml, context) {
                const mucElement = findAll(xml, NS_MUC_USER, 'x')[0];
                if (!mucElement) {
                    return;
                }
                const confElement = findAll(xml, NS_MUC_DIRECT_INVITE, 'x')[0];
                if (!confElement) {
                    return;
                }
                return context.registry
                    ? context.registry.import(
                          confElement,
                          Object.assign(Object.assign({}, context), { path: 'message' })
                      )
                    : undefined;
            },
            importOrder: -1
        }
    })
];
export default Protocol;
