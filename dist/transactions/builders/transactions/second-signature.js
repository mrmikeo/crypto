"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../../enums");
const identities_1 = require("../../../identities");
const managers_1 = require("../../../managers");
const utils_1 = require("../../../utils");
const transaction_1 = require("./transaction");
class SecondSignatureBuilder extends transaction_1.TransactionBuilder {
    constructor() {
        super();
        this.data.type = enums_1.TransactionTypes.SecondSignature;
        this.data.fee = managers_1.feeManager.get(enums_1.TransactionTypes.SecondSignature);
        this.data.amount = utils_1.BigNumber.ZERO;
        this.data.recipientId = undefined;
        this.data.senderPublicKey = undefined;
        this.data.asset = { signature: {} };
    }
    signatureAsset(secondPassphrase) {
        this.data.asset.signature.publicKey = identities_1.Keys.fromPassphrase(secondPassphrase).publicKey;
        return this;
    }
    getStruct() {
        const struct = super.getStruct();
        struct.amount = this.data.amount;
        struct.recipientId = this.data.recipientId;
        struct.asset = this.data.asset;
        return struct;
    }
    instance() {
        return this;
    }
}
exports.SecondSignatureBuilder = SecondSignatureBuilder;
//# sourceMappingURL=second-signature.js.map