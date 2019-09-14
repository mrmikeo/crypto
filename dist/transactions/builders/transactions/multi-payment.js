"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../../enums");
const errors_1 = require("../../../errors");
const managers_1 = require("../../../managers");
const utils_1 = require("../../../utils");
const transaction_1 = require("./transaction");
class MultiPaymentBuilder extends transaction_1.TransactionBuilder {
    constructor() {
        super();
        this.data.type = enums_1.TransactionTypes.MultiPayment;
        this.data.fee = managers_1.feeManager.get(enums_1.TransactionTypes.MultiPayment);
        this.data.payments = {};
        this.data.vendorFieldHex = undefined;
        this.data.asset = {
            payments: [],
        };
        this.data.amount = utils_1.BigNumber.make(0);
    }
    addPayment(recipientId, amount) {
        if (this.data.asset.payments.length >= 2258) {
            throw new errors_1.MaximumPaymentCountExceededError(this.data.asset.payments.length);
        }
        this.data.asset.payments.push({
            amount: utils_1.BigNumber.make(amount),
            recipientId,
        });
        this.data.amount = this.data.amount.plus(amount);
        return this;
    }
    getStruct() {
        const struct = super.getStruct();
        struct.senderPublicKey = this.data.senderPublicKey;
        struct.vendorFieldHex = this.data.vendorFieldHex;
        struct.amount = this.data.amount;
        struct.asset = this.data.asset;
        return struct;
    }
    instance() {
        return this;
    }
}
exports.MultiPaymentBuilder = MultiPaymentBuilder;
//# sourceMappingURL=multi-payment.js.map