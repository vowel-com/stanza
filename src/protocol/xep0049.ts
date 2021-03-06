// ====================================================================
// XEP-0049: Private XML Storage
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0049.html
// Version: 1.2 (2004-03-01)
// ====================================================================

import { DefinitionOptions } from '../jxt';

import { NS_PRIVATE } from '../Namespaces';

declare module './' {
    export interface IQPayload {
        privateStorage?: PrivateStorage;
    }
}

// tslint:disable
export interface PrivateStorage {}
// tslint:enable

const Protocol: DefinitionOptions = {
    element: 'query',
    namespace: NS_PRIVATE,
    path: 'iq.privateStorage'
};
export default Protocol;
