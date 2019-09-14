"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delegate_registration_1 = require("./transactions/delegate-registration");
const delegate_resignation_1 = require("./transactions/delegate-resignation");
const ipfs_1 = require("./transactions/ipfs");
const multi_payment_1 = require("./transactions/multi-payment");
const multi_signature_1 = require("./transactions/multi-signature");
const second_signature_1 = require("./transactions/second-signature");
const timelock_transfer_1 = require("./transactions/timelock-transfer");
const transfer_1 = require("./transactions/transfer");
const vote_1 = require("./transactions/vote");
class BuilderFactory {
    static transfer() {
        return new transfer_1.TransferBuilder();
    }
    static secondSignature() {
        return new second_signature_1.SecondSignatureBuilder();
    }
    static delegateRegistration() {
        return new delegate_registration_1.DelegateRegistrationBuilder();
    }
    static vote() {
        return new vote_1.VoteBuilder();
    }
    static multiSignature() {
        return new multi_signature_1.MultiSignatureBuilder();
    }
    static ipfs() {
        return new ipfs_1.IPFSBuilder();
    }
    static timelockTransfer() {
        return new timelock_transfer_1.TimelockTransferBuilder();
    }
    static multiPayment() {
        return new multi_payment_1.MultiPaymentBuilder();
    }
    static delegateResignation() {
        return new delegate_resignation_1.DelegateResignationBuilder();
    }
}
exports.BuilderFactory = BuilderFactory;
//# sourceMappingURL=index.js.map