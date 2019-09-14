"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../../enums");
const managers_1 = require("../../../managers");
const utils_1 = require("../../../utils");
const transaction_1 = require("./transaction");
class TransferBuilder extends transaction_1.TransactionBuilder {
    constructor() {
        super();
        this.data.type = enums_1.TransactionTypes.Transfer;
        this.data.fee = managers_1.feeManager.get(enums_1.TransactionTypes.Transfer);
        this.data.amount = utils_1.BigNumber.ZERO;
        this.data.recipientId = undefined;
        this.data.senderPublicKey = undefined;
        this.data.expiration = 0;
    }
    expiration(expiration) {
        this.data.expiration = expiration;
        return this.instance();
    }
    getStruct() {
        const struct = super.getStruct();
        struct.amount = this.data.amount;
        struct.recipientId = this.data.recipientId;
        struct.asset = this.data.asset;
        struct.vendorField = this.data.vendorField;
        struct.expiration = this.data.expiration;
        return struct;
    }
    instance() {
        return this;
    }
}
exports.TransferBuilder = TransferBuilder;
//# sourceMappingURL=transfer.js.map