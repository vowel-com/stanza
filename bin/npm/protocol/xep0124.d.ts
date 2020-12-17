import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
declare type BOSHErrorCondition =
    | 'bad-request'
    | 'host-gone'
    | 'host-unknown'
    | 'improper-addressing'
    | 'internal-server-error'
    | 'item-not-found'
    | 'other-request'
    | 'policy-violation'
    | 'remote-connection-failed'
    | 'remote-stream-error'
    | 'see-other-uri'
    | 'system-shutdown'
    | 'undefined-condition';
export interface BOSH {
    seeOtherURI?: string;
    acceptMediaTypes?: string;
    ack?: number;
    maxSessionPause?: number;
    characterSets?: string;
    from?: JID;
    to?: JID;
    lang?: string;
    version?: string;
    maxWaitTime?: number;
    maxHoldOpen?: number;
    route?: string;
    sid?: string;
    rid?: number;
    maxClientRequests?: number;
    minPollingInterval?: number;
    maxInactivityTime?: number;
    report?: number;
    timeSinceReport?: number;
    type?: 'error' | 'terminate';
    condition?: BOSHErrorCondition;
    xmppRestart?: boolean;
    xmppRestartLogic?: boolean;
    xmppVersion?: string;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
