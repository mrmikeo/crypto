import { DelegateRegistrationBuilder } from "./transactions/delegate-registration";
import { DelegateResignationBuilder } from "./transactions/delegate-resignation";
import { IPFSBuilder } from "./transactions/ipfs";
import { MultiPaymentBuilder } from "./transactions/multi-payment";
import { MultiSignatureBuilder } from "./transactions/multi-signature";
import { SecondSignatureBuilder } from "./transactions/second-signature";
import { TimelockTransferBuilder } from "./transactions/timelock-transfer";
import { TransferBuilder } from "./transactions/transfer";
import { VoteBuilder } from "./transactions/vote";
export declare class BuilderFactory {
    static transfer(): TransferBuilder;
    static secondSignature(): SecondSignatureBuilder;
    static delegateRegistration(): DelegateRegistrationBuilder;
    static vote(): VoteBuilder;
    static multiSignature(): MultiSignatureBuilder;
    static ipfs(): IPFSBuilder;
    static timelockTransfer(): TimelockTransferBuilder;
    static multiPayment(): MultiPaymentBuilder;
    static delegateResignation(): DelegateResignationBuilder;
}
