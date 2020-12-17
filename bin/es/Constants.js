import {
    NS_BOSH,
    NS_CLIENT,
    NS_COMPONENT,
    NS_JINGLE_FILE_TRANSFER_5,
    NS_JINGLE_RTP_INFO_1,
    NS_SERVER
} from './Namespaces';
export const VERSION = '0.1.2';
// ====================================================================
// Frequently Used Values
// ====================================================================
const NotAuthorized = 'not-authorized';
// ====================================================================
// Named Enum Constants
// ====================================================================
export const StreamType = {
    Bosh: NS_BOSH,
    Client: NS_CLIENT,
    Component: NS_COMPONENT,
    Server: NS_SERVER
};
export const SASLFailureCondition = {
    AccountDisabled: 'account-disabled',
    CredentialsExpired: 'credentials-expired',
    EncryptionRequired: 'encryption-required',
    IncorrectEncoding: 'incorrect-encoding',
    InvalidAuthzid: 'invalid-authzid',
    InvalidMechanism: 'invalid-mechanism',
    MalformedRequest: 'malformed-request',
    MechanismTooWeak: 'mechanism-too-weak',
    NotAuthorized,
    TemporaryAuthFailure: 'temporary-auth-failure'
};
export const StreamErrorCondition = {
    BadFormat: 'bad-format',
    BadNamespacePrefix: 'bad-namespace-prefix',
    Conflict: 'conflict',
    ConnectionTimeout: 'connection-timeout',
    HostGone: 'host-gone',
    HostUnknown: 'host-unknown',
    ImproperAddressing: 'improper-addressing',
    InternalServerError: 'internal-server-error',
    InvalidFrom: 'invalid-from',
    InvalidId: 'invalid-id',
    InvalidNamespace: 'invalid-namespace',
    InvalidXML: 'invalid-xml',
    NotAuthorized,
    NotWellFormed: 'not-well-formed',
    PolicyViolation: 'policy-violation',
    RemoteConnectionFailed: 'remote-connection-failed',
    Reset: 'reset',
    ResourceConstraint: 'resource-constraint',
    RestrictedXML: 'restricted-xml',
    SeeOtherHost: 'see-other-host',
    SystemShutdown: 'system-shutdown',
    UndefinedCondition: 'undefined-condition',
    UnsupportedEncoding: 'unsupported-encoding',
    UnsupportedStanzaType: 'unsupported-stanza-type',
    UnsupportedVersion: 'unsupported-version'
};
export const StanzaErrorCondition = {
    BadRequest: 'bad-request',
    Conflict: 'conflict',
    FeatureNotImplemented: 'feature-not-implemented',
    Forbidden: 'forbidden',
    Gone: 'gone',
    InternalServerError: 'internal-server-error',
    ItemNotFound: 'item-not-found',
    JIDMalformed: 'jid-malformed',
    NotAcceptable: 'not-acceptable',
    NotAllowed: 'not-allowed',
    NotAuthorized,
    PolicyViolation: 'policy-violation',
    RecipientUnavailable: 'recipient-unavailable',
    Redirect: 'redirect',
    RegistrationRequired: 'registration-required',
    RemoteServerNotFound: 'remote-server-not-found',
    RemoteServerTimeout: 'remote-server-timeout',
    ResourceConstraint: 'resource-constraint',
    ServiceUnavailable: 'service-unavailable',
    SubscriptionRequired: 'subscription-required',
    UndefinedCondition: 'undefined-condition',
    UnexpectedRequest: 'unexpected-request'
};
export const MessageType = {
    Chat: 'chat',
    Error: 'error',
    GroupChat: 'groupchat',
    Headline: 'headline',
    Normal: 'normal'
};
export const PresenceType = {
    Available: undefined,
    Error: 'error',
    Probe: 'probe',
    Subscribe: 'subscribe',
    Subscribed: 'subscribed',
    Unavailable: 'unavailable',
    Unsubscribe: 'unsubscribe',
    Unsubscribed: 'unsubscribed'
};
export const IQType = {
    Error: 'error',
    Get: 'get',
    Result: 'result',
    Set: 'set'
};
export const PresenceShow = {
    Away: 'away',
    Chat: 'chat',
    DoNotDisturb: 'dnd',
    ExtendedAway: 'xa'
};
export const RosterSubscription = {
    Both: 'both',
    From: 'from',
    None: 'none',
    ReceivePresenceOnly: 'to',
    Remove: 'remove',
    SendAndReceivePresence: 'both',
    SendPresenceOnly: 'from',
    To: 'to'
};
export const DataFormType = {
    Cancel: 'cancel',
    Form: 'form',
    Result: 'result',
    Submit: 'submit'
};
export const DataFormFieldType = {
    Boolean: 'boolean',
    Fixed: 'fixed',
    Hidden: 'hidden',
    JID: 'jid-single',
    JIDMultiple: 'jid-multi',
    List: 'list-single',
    ListMultiple: 'list-multi',
    Password: 'text-private',
    Text: 'text-single',
    TextMultiple: 'text-multi',
    TextPrivate: 'text-private'
};
export const MUCAffiliation = {
    Admin: 'admin',
    Banned: 'outcast',
    Member: 'member',
    None: 'none',
    Outcast: 'outcast',
    Owner: 'owner'
};
export const MUCRole = {
    Moderator: 'moderator',
    None: 'none',
    Participant: 'participant',
    Visitor: 'visitor'
};
export const MUCStatusCode = {
    AffiliationChanged: '101',
    AffiliationLost: '321',
    Banned: '301',
    Error: '333',
    Kicked: '307',
    LoggingDisabled: '171',
    LoggingEnabled: '170',
    MembershipLost: '322',
    NickChanged: '303',
    NickChangedByService: '210',
    NonAnonymous: '172',
    NonAnonymousRoom: '100',
    NonPrivacyConfigurationChange: '104',
    RoomCreated: '201',
    SelfPresence: '110',
    SemiAnonymous: '173',
    Shutdown: '332',
    UnavailableMembersListed: '102',
    UnavailableMembersNotListed: '103'
};
export const PubsubErrorCondition = {
    ClosedNode: 'closed-node',
    ConfigurationRequired: 'configuration-required',
    InvalidJID: 'invalid-jid',
    InvalidOptions: 'invalid-options',
    InvalidPayload: 'invalid-payload',
    InvalidSubscriptionId: 'invalid-subid',
    ItemForbidden: 'item-forbidden',
    ItemRequired: 'item-required',
    JIDRequired: 'jid-required',
    MaxItemsExceeded: 'max-items-exceeded',
    MaxNodesExceeded: 'max-nodes-exceeded',
    NodeIdRequired: 'nodeid-required',
    NotInRosterGroup: 'not-in-roster-group',
    NotSubscribed: 'not-subscribed',
    PayloadRequired: 'payload-required',
    PayloadTooBig: 'payload-too-big',
    PendingSubscription: 'pending-subscription',
    PresenceSubscriptionRequired: 'presence-subscription-required',
    SubscriptionIdRequired: 'subid-required',
    TooManySubscriptions: 'too-many-subscriptions',
    Unsupported: 'unsupported',
    UnsupportedAccessModel: 'unsupported-access-model'
};
export const ChatState = {
    Active: 'active',
    Composing: 'composing',
    Gone: 'gone',
    Inactive: 'inactive',
    Paused: 'paused'
};
export const JingleSessionRole = {
    Initiator: 'initiator',
    Responder: 'responder'
};
export const JingleApplicationDirection = {
    Inactive: 'inactive',
    Receive: 'recvonly',
    Send: 'sendonly',
    SendReceive: 'sendrecv'
};
export const JingleContentSenders = {
    Both: 'both',
    Initiator: 'initiator',
    None: 'none',
    Responder: 'responder'
};
export const JingleAction = {
    ContentAccept: 'content-accept',
    ContentAdd: 'content-add',
    ContentModify: 'content-modify',
    ContentReject: 'content-reject',
    ContentRemove: 'content-remove',
    DescriptionInfo: 'description-info',
    SecurityInfo: 'security-info',
    SessionAccept: 'session-accept',
    SessionInfo: 'session-info',
    SessionInitiate: 'session-initiate',
    SessionTerminate: 'session-terminate',
    TransportAccept: 'transport-accept',
    TransportInfo: 'transport-info',
    TransportReject: 'transport-reject',
    TransportReplace: 'transport-replace'
};
export const JingleErrorCondition = {
    OutOfOrder: 'out-of-order',
    TieBreak: 'tie-break',
    UnknownContent: 'unknown-content',
    UnknownSession: 'unknown-session',
    UnsupportedInfo: 'unsupported-info'
};
export const JingleReasonCondition = {
    AlternativeSession: 'alternative-session',
    Busy: 'busy',
    Cancel: 'cancel',
    ConnectivityError: 'connectivity-error',
    Decline: 'decline',
    Expired: 'expired',
    FailedApplication: 'failed-application',
    FailedTransport: 'failed-transport',
    GeneralError: 'general-error',
    Gone: 'gone',
    IncompatibleParameters: 'incompatible-parameters',
    MediaError: 'media-error',
    SecurityError: 'security-error',
    Success: 'success',
    Timeout: 'timeout',
    UnsupportedApplications: 'unsupported-applications',
    UnsupportedTransports: 'unsupported-transports'
};
// ====================================================================
// Standalone Constants
// ====================================================================
export const USER_MOODS = [
    'afraid',
    'amazed',
    'amorous',
    'angry',
    'annoyed',
    'anxious',
    'aroused',
    'ashamed',
    'bored',
    'brave',
    'calm',
    'cautious',
    'cold',
    'confident',
    'confused',
    'contemplative',
    'contented',
    'cranky',
    'crazy',
    'creative',
    'curious',
    'dejected',
    'depressed',
    'disappointed',
    'disgusted',
    'dismayed',
    'distracted',
    'embarrassed',
    'envious',
    'excited',
    'flirtatious',
    'frustrated',
    'grateful',
    'grieving',
    'grumpy',
    'guilty',
    'happy',
    'hopeful',
    'hot',
    'humbled',
    'humiliated',
    'hungry',
    'hurt',
    'impressed',
    'in_awe',
    'in_love',
    'indignant',
    'interested',
    'intoxicated',
    'invincible',
    'jealous',
    'lonely',
    'lost',
    'lucky',
    'mean',
    'moody',
    'nervous',
    'neutral',
    'offended',
    'outraged',
    'playful',
    'proud',
    'relaxed',
    'relieved',
    'remorseful',
    'restless',
    'sad',
    'sarcastic',
    'satisfied',
    'serious',
    'shocked',
    'shy',
    'sick',
    'sleepy',
    'spontaneous',
    'stressed',
    'strong',
    'surprised',
    'thankful',
    'thirsty',
    'tired',
    'undefined',
    'weak',
    'worried'
];
export const USER_ACTIVITY_GENERAL = [
    'doing_chores',
    'drinking',
    'eating',
    'exercising',
    'grooming',
    'having_appointment',
    'inactive',
    'relaxing',
    'talking',
    'traveling',
    'undefined',
    'working'
];
export const USER_ACTIVITY_SPECIFIC = [
    'at_the_spa',
    'brushing_teeth',
    'buying_groceries',
    'cleaning',
    'coding',
    'commuting',
    'cooking',
    'cycling',
    'cycling',
    'dancing',
    'day_off',
    'doing_maintenance',
    'doing_the_dishes',
    'doing_the_laundry',
    'driving',
    'fishing',
    'gaming',
    'gardening',
    'getting_a_haircut',
    'going_out',
    'hanging_out',
    'having_a_beer',
    'having_a_snack',
    'having_breakfast',
    'having_coffee',
    'having_dinner',
    'having_lunch',
    'having_tea',
    'hiding',
    'hiking',
    'in_a_car',
    'in_a_meeting',
    'in_real_life',
    'jogging',
    'on_a_bus',
    'on_a_plane',
    'on_a_train',
    'on_a_trip',
    'on_the_phone',
    'on_vacation',
    'on_video_phone',
    'other',
    'partying',
    'playing_sports',
    'praying',
    'reading',
    'rehearsing',
    'running',
    'running_an_errand',
    'scheduled_holiday',
    'shaving',
    'shopping',
    'skiing',
    'sleeping',
    'smoking',
    'socializing',
    'studying',
    'sunbathing',
    'swimming',
    'taking_a_bath',
    'taking_a_shower',
    'thinking',
    'walking',
    'walking_the_dog',
    'watching_a_movie',
    'watching_tv',
    'working_out',
    'writing'
];
export const JINGLE_INFO = (namespace, name) => `{${namespace}}${name}`;
export const JINGLE_INFO_MUTE = JINGLE_INFO(NS_JINGLE_RTP_INFO_1, 'mute');
export const JINGLE_INFO_UNMUTE = JINGLE_INFO(NS_JINGLE_RTP_INFO_1, 'unmute');
export const JINGLE_INFO_HOLD = JINGLE_INFO(NS_JINGLE_RTP_INFO_1, 'hold');
export const JINGLE_INFO_UNHOLD = JINGLE_INFO(NS_JINGLE_RTP_INFO_1, 'unhold');
export const JINGLE_INFO_ACTIVE = JINGLE_INFO(NS_JINGLE_RTP_INFO_1, 'active');
export const JINGLE_INFO_RINGING = JINGLE_INFO(NS_JINGLE_RTP_INFO_1, 'ringing');
export const JINGLE_INFO_CHECKSUM_5 = JINGLE_INFO(NS_JINGLE_FILE_TRANSFER_5, 'checksum');
export const JINGLE_INFO_RECEIVED_5 = JINGLE_INFO(NS_JINGLE_FILE_TRANSFER_5, 'received');
// ====================================================================
// Helper Functions
// ====================================================================
export function sendersToDirection(role, senders = JingleContentSenders.Both) {
    const isInitiator = role === JingleSessionRole.Initiator;
    switch (senders) {
        case JingleContentSenders.Initiator:
            return isInitiator
                ? JingleApplicationDirection.Send
                : JingleApplicationDirection.Receive;
        case JingleContentSenders.Responder:
            return isInitiator
                ? JingleApplicationDirection.Receive
                : JingleApplicationDirection.Send;
        case JingleContentSenders.Both:
            return JingleApplicationDirection.SendReceive;
    }
    return JingleApplicationDirection.Inactive;
}
export function directionToSenders(role, direction = JingleApplicationDirection.SendReceive) {
    const isInitiator = role === JingleSessionRole.Initiator;
    switch (direction) {
        case JingleApplicationDirection.Send:
            return isInitiator ? JingleContentSenders.Initiator : JingleContentSenders.Responder;
        case JingleApplicationDirection.Receive:
            return isInitiator ? JingleContentSenders.Responder : JingleContentSenders.Initiator;
        case JingleApplicationDirection.SendReceive:
            return JingleContentSenders.Both;
    }
    return JingleContentSenders.None;
}
