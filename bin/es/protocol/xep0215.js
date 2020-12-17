// ====================================================================
// XEP-0215: External Service Discovery
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0215.html
// Version: 0.6 (2014-02-27)
// ====================================================================
import {
    attribute,
    booleanAttribute,
    childAttribute,
    childBooleanAttribute,
    childDateAttribute,
    childIntegerAttribute,
    dateAttribute,
    integerAttribute
} from '../jxt';
import { NS_DISCO_EXTERNAL_1, NS_DISCO_EXTERNAL_2 } from '../Namespaces';
const versions = {
    2: NS_DISCO_EXTERNAL_2,
    1: NS_DISCO_EXTERNAL_1
};
const Protocol = [];
for (const [version, namespace] of Object.entries(versions)) {
    Protocol.push(
        {
            aliases: ['iq.externalServiceCredentials'],
            defaultType: '2',
            element: 'credentials',
            fields: {
                expires: childDateAttribute(null, 'service', 'expires'),
                host: childAttribute(null, 'service', 'host'),
                name: childAttribute(null, 'service', 'name'),
                password: childAttribute(null, 'service', 'password'),
                port: childIntegerAttribute(null, 'service', 'port'),
                restricted: childBooleanAttribute(null, 'service', 'restricted'),
                transport: childAttribute(null, 'service', 'transport'),
                type: childAttribute(null, 'service', 'type'),
                username: childAttribute(null, 'service', 'username')
            },
            namespace,
            type: version,
            typeField: 'version'
        },
        {
            aliases: ['iq.externalServices'],
            defaultType: '2',
            element: 'services',
            fields: {
                type: attribute('type')
            },
            namespace,
            type: version,
            typeField: 'version'
        },
        {
            aliases: [{ path: 'iq.externalServices.services', multiple: true }],
            defaultType: '2',
            element: 'service',
            fields: {
                expires: dateAttribute('expires'),
                host: attribute('host'),
                name: attribute('name'),
                password: attribute('password'),
                port: integerAttribute('port'),
                restricted: booleanAttribute('restricted'),
                transport: attribute('transport'),
                type: attribute('type'),
                username: attribute('username')
            },
            namespace,
            type: version,
            typeField: 'version'
        }
    );
}
export default Protocol;
