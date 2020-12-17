import { JingleSessionRole } from '../../Constants';
import {
    Jingle,
    JingleContent,
    JingleIce,
    JingleIceCandidate,
    JingleRtpDescription
} from '../../protocol';
import {
    IntermediateCandidate,
    IntermediateMediaDescription,
    IntermediateSessionDescription
} from './Intermediate';
export declare function convertIntermediateToApplication(
    media: IntermediateMediaDescription,
    role: JingleSessionRole
): JingleRtpDescription;
export declare function convertIntermediateToCandidate(
    candidate: IntermediateCandidate
): JingleIceCandidate;
export declare function convertCandidateToIntermediate(
    candidate: JingleIceCandidate
): IntermediateCandidate;
export declare function convertIntermediateToTransport(
    media: IntermediateMediaDescription,
    transportType: JingleIce['transportType']
): JingleIce;
export declare function convertIntermediateToRequest(
    session: IntermediateSessionDescription,
    role: JingleSessionRole,
    transportType: JingleIce['transportType']
): Partial<Jingle>;
export declare function convertContentToIntermediate(
    content: JingleContent,
    role: JingleSessionRole
): IntermediateMediaDescription;
export declare function convertRequestToIntermediate(
    jingle: Jingle,
    role: JingleSessionRole
): IntermediateSessionDescription;
