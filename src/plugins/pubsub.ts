import { Agent } from '../';
import {
    NS_SHIM,
    PubsubEvent,
    PubsubEventConfiguration,
    PubsubEventDelete,
    PubsubEventItems,
    PubsubEventPurge,
    PubsubEventSubscription,
    PubsubItem,
    ReceivedMessage
} from '../protocol';
import {
    DataForm,
    IQ,
    Paging,
    PubsubAffiliation,
    PubsubItemContent,
    PubsubSubscribe,
    PubsubSubscription,
    PubsubSubscriptions,
    PubsubUnsubscribe
} from '../protocol';

declare module '../' {
    export interface Agent {
        subscribeToNode(jid: string, opts: string | PubsubSubscribe): Promise<IQ>;
        unsubscribeFromNode(jid: string, opts: string | PubsubUnsubscribe): Promise<IQ>;
        publish<T extends PubsubItemContent = PubsubItemContent>(
            jid: string,
            node: string,
            item: T,
            id?: string
        ): Promise<IQ>;
        getItem(jid: string, node: string, id: string): Promise<IQ>;
        getItems(jid: string, node: string, opts: Paging): Promise<IQ>;
        retract(jid: string, node: string, id: string, notify: boolean): Promise<IQ>;
        purgeNode(jid: string, node: string): Promise<IQ>;
        deleteNode(jid: string, node: string): Promise<IQ>;
        createNode(jid: string, node: string, config?: DataForm): Promise<IQ>;
        getSubscriptions(jid: string, opts?: PubsubSubscriptions): Promise<IQ>;
        getAffiliations(jid: string, node?: string): Promise<IQ>;
        getNodeSubscribers(
            jid: string,
            node: string | PubsubSubscriptions,
            opts?: PubsubSubscriptions
        ): Promise<IQ>;
        updateNodeSubscriptions(
            jid: string,
            node: string,
            delta: PubsubSubscription[]
        ): Promise<IQ>;
        getNodeAffiliations(jid: string, node: string): Promise<IQ>;
        updateNodeAffiliations(jid: string, node: string, items: PubsubAffiliation[]): Promise<IQ>;
    }

    export interface AgentEvents {
        'pubsub:event': PubsubEventMessage;
        'pubsub:published': PubsubPublish;
        'pubsub:retracted': PubsubRetract;
        'pubsub:purged': PubsubEventMessage & { pubsub: PubsubEventPurge };
        'pubsub:deleted': PubsubEventMessage & { pubsub: PubsubEventDelete };
        'pubsub:subscription': PubsubEventMessage & { pubsub: PubsubEventSubscription };
        'pubsub:config': PubsubEventMessage & { pubsub: PubsubEventConfiguration };
    }
}

type PubsubEventMessage = ReceivedMessage & { pubsub: PubsubEvent };
type PubsubPublish = PubsubEventMessage & {
    pubsub: PubsubEventItems & {
        items: {
            published: PubsubItem[];
        };
    };
};
type PubsubRetract = PubsubEventMessage & {
    pubsub: PubsubEventItems & {
        items: {
            retracted: PubsubItem[];
        };
    };
};

function isPubsubMessage(msg: ReceivedMessage): msg is PubsubEventMessage {
    return !!msg.pubsub;
}
function isPubsubPublish(msg: PubsubEventMessage): msg is PubsubPublish {
    return !!msg.pubsub.items && !!msg.pubsub.items.published;
}
function isPubsubRetract(msg: PubsubEventMessage): msg is PubsubRetract {
    return !!msg.pubsub.items && !!msg.pubsub.items.retracted;
}
function isPubsubPurge(
    msg: PubsubEventMessage
): msg is PubsubEventMessage & { pubsub: PubsubEventPurge } {
    return msg.pubsub.eventType === 'purge';
}
function isPubsubDelete(
    msg: PubsubEventMessage
): msg is PubsubEventMessage & { pubsub: PubsubEventDelete } {
    return msg.pubsub.eventType === 'purge';
}
function isPubsubSubscription(
    msg: PubsubEventMessage
): msg is PubsubEventMessage & { pubsub: PubsubEventSubscription } {
    return msg.pubsub.eventType === 'subscription';
}
function isPubsubConfiguration(
    msg: PubsubEventMessage
): msg is PubsubEventMessage & { pubsub: PubsubEventConfiguration } {
    return msg.pubsub.eventType === 'configuration';
}

export default function(client: Agent) {
    client.disco.addFeature(`${NS_SHIM}#SubID`, NS_SHIM);

    client.on('message', msg => {
        if (!isPubsubMessage(msg)) {
            return;
        }
        client.emit('pubsub:event', msg);

        if (isPubsubPublish(msg)) {
            client.emit('pubsub:published', msg);
            return;
        }
        if (isPubsubRetract(msg)) {
            client.emit('pubsub:retracted', msg);
            return;
        }
        if (isPubsubPurge(msg)) {
            client.emit('pubsub:purged', msg);
            return;
        }
        if (isPubsubDelete(msg)) {
            client.emit('pubsub:deleted', msg);
            return;
        }
        if (isPubsubSubscription(msg)) {
            client.emit('pubsub:subscription', msg);
            return;
        }
        if (isPubsubConfiguration(msg)) {
            client.emit('pubsub:config', msg);
            return;
        }

        /*
        TODO
        if (msg.pubsub && msg.pubsub.affiliations) {
            client.emit('pubsub:affiliation', msg);
        }
        */
    });

    client.subscribeToNode = (jid: string, opts: string | PubsubSubscribe) => {
        if (typeof opts === 'string') {
            opts = {
                node: opts
            };
        }
        opts.jid = opts.jid || client.jid;

        return client.sendIQ({
            pubsub: {
                context: 'user',
                subscribe: opts
            },
            to: jid,
            type: 'set'
        });
    };

    client.unsubscribeFromNode = (jid: string, opts: string | PubsubUnsubscribe) => {
        if (typeof opts === 'string') {
            opts = {
                node: opts
            };
        }
        opts.jid = opts.jid || client.jid;

        return client.sendIQ({
            pubsub: {
                context: 'user',
                unsubscribe: opts
            },
            to: jid,
            type: 'set'
        });
    };

    client.publish = <T extends PubsubItemContent = PubsubItemContent>(
        jid: string,
        node: string,
        item: T,
        id?: string
    ) => {
        return client.sendIQ({
            pubsub: {
                context: 'user',
                publish: {
                    item: {
                        content: item,
                        id
                    },
                    node
                }
            },
            to: jid,
            type: 'set'
        });
    };

    client.getItem = (jid: string, node: string, id: string) => {
        return client.sendIQ({
            pubsub: {
                context: 'user',
                fetch: {
                    items: [{ id }],
                    node
                }
            },
            to: jid,
            type: 'get'
        });
    };

    client.getItems = (jid: string, node: string, opts: Paging) => {
        return client.sendIQ({
            pubsub: {
                context: 'user',
                fetch: {
                    max: opts.max,
                    node
                },
                paging: opts
            },
            to: jid,
            type: 'get'
        });
    };

    client.retract = (jid: string, node: string, id: string, notify: boolean) => {
        return client.sendIQ({
            pubsub: {
                context: 'user',
                retract: {
                    id,
                    node,
                    notify
                }
            },
            to: jid,
            type: 'set'
        });
    };

    client.purgeNode = (jid: string, node: string) => {
        return client.sendIQ({
            pubsub: {
                context: 'owner',
                purge: node
            },
            to: jid,
            type: 'set'
        });
    };

    client.deleteNode = (jid: string, node: string) => {
        return client.sendIQ({
            pubsub: {
                context: 'owner',
                destroy: {
                    node
                }
            },
            to: jid,
            type: 'set'
        });
    };

    client.createNode = (jid: string, node: string, config?: DataForm) => {
        return client.sendIQ({
            pubsub: {
                configure: !!config
                    ? {
                          form: config
                      }
                    : undefined,
                context: 'user',
                create: {
                    node
                }
            },
            to: jid,
            type: 'set'
        });
    };

    client.getSubscriptions = (jid: string, opts: PubsubSubscriptions = {}) => {
        return client.sendIQ({
            pubsub: {
                subscriptions: opts
            },
            to: jid,
            type: 'get'
        });
    };

    client.getAffiliations = (jid: string, node?: string) => {
        return client.sendIQ({
            pubsub: {
                affiliations: {
                    node
                }
            },
            to: jid,
            type: 'get'
        });
    };

    client.getNodeSubscribers = (
        jid: string,
        node: string | PubsubSubscriptions,
        opts: PubsubSubscriptions = {}
    ) => {
        if (typeof node === 'string') {
            opts.node = node;
        } else {
            opts = {
                ...opts,
                ...node
            };
        }
        return client.sendIQ({
            pubsub: {
                context: 'owner',
                subscriptions: opts
            },
            to: jid,
            type: 'get'
        });
    };

    client.updateNodeSubscriptions = (jid: string, node: string, delta: PubsubSubscription[]) => {
        return client.sendIQ({
            pubsub: {
                context: 'owner',
                subscriptions: {
                    items: delta,
                    node
                }
            },
            to: jid,
            type: 'set'
        });
    };

    client.getNodeAffiliations = (jid: string, node: string) => {
        return client.sendIQ({
            pubsub: {
                affiliations: {
                    node
                },
                context: 'owner'
            },
            to: jid,
            type: 'get'
        });
    };

    client.updateNodeAffiliations = (jid: string, node: string, items: PubsubAffiliation[]) => {
        return client.sendIQ({
            pubsub: {
                affiliations: {
                    items,
                    node
                },
                context: 'owner'
            },
            to: jid,
            type: 'set'
        });
    };
}