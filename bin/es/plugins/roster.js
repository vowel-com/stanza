import { __awaiter } from 'tslib';
import * as JID from '../JID';
export default function (client) {
    client.on('iq:set:roster', iq => {
        const allowed = JID.allowedResponders(client.jid);
        if (!allowed.has(iq.from)) {
            return client.sendIQError(iq, {
                error: {
                    condition: 'service-unavailable',
                    type: 'cancel'
                }
            });
        }
        client.emit('roster:update', iq);
        client.sendIQResult(iq);
    });
    client.on('iq:set:blockList', iq => {
        const allowed = JID.allowedResponders(client.jid);
        if (!allowed.has(iq.from)) {
            return client.sendIQError(iq, {
                error: {
                    condition: 'service-unavailable',
                    type: 'cancel'
                }
            });
        }
        const blockList = iq.blockList;
        client.emit(blockList.action, {
            jids: blockList.jids || []
        });
        client.sendIQResult(iq);
    });
    client.getRoster = () =>
        __awaiter(this, void 0, void 0, function* () {
            const resp = yield client.sendIQ({
                roster: {
                    version: client.config.rosterVer
                },
                type: 'get'
            });
            if (resp.roster) {
                const version = resp.roster.version;
                if (version) {
                    client.config.rosterVer = version;
                    client.emit('roster:ver', version);
                }
                resp.roster.items = resp.roster.items || [];
                return resp.roster;
            } else {
                return { items: [] };
            }
        });
    client.updateRosterItem = item =>
        __awaiter(this, void 0, void 0, function* () {
            yield client.sendIQ({
                roster: {
                    items: [item]
                },
                type: 'set'
            });
        });
    client.removeRosterItem = jid => {
        return client.updateRosterItem({ jid, subscription: 'remove' });
    };
    client.subscribe = jid => {
        client.sendPresence({ type: 'subscribe', to: jid });
    };
    client.unsubscribe = jid => {
        client.sendPresence({ type: 'unsubscribe', to: jid });
    };
    client.acceptSubscription = jid => {
        client.sendPresence({ type: 'subscribed', to: jid });
    };
    client.denySubscription = jid => {
        client.sendPresence({ type: 'unsubscribed', to: jid });
    };
    client.getBlocked = () =>
        __awaiter(this, void 0, void 0, function* () {
            const result = yield client.sendIQ({
                blockList: {
                    action: 'list'
                },
                type: 'get'
            });
            return Object.assign({ jids: [] }, result.blockList);
        });
    function toggleBlock(action, jid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client.sendIQ({
                blockList: {
                    action,
                    jids: [jid]
                },
                type: 'set'
            });
        });
    }
    client.block = jid =>
        __awaiter(this, void 0, void 0, function* () {
            return toggleBlock('block', jid);
        });
    client.unblock = jid =>
        __awaiter(this, void 0, void 0, function* () {
            return toggleBlock('unblock', jid);
        });
    client.goInvisible = (probe = false) =>
        __awaiter(this, void 0, void 0, function* () {
            yield client.sendIQ({
                type: 'set',
                visiblity: {
                    probe,
                    type: 'invisible'
                }
            });
        });
    client.goVisible = () =>
        __awaiter(this, void 0, void 0, function* () {
            yield client.sendIQ({
                type: 'set',
                visiblity: {
                    type: 'visible'
                }
            });
        });
}
