"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../../enums");
const managers_1 = require("../../../managers");
const utils_1 = require("../../../utils");
const transaction_1 = require("./transaction");
class DelegateResignationBuilder extends transaction_1.TransactionBuilder {
    constructor() {
        super();
        this.data.type = enums_1.TransactionTypes.DelegateResignation;
        this.data.version = 2;
        this.data.fee = managers_1.feeManager.get(enums_1.TransactionTypes.DelegateResignation);
        this.data.amount = utils_1.BigNumber.ZERO;
        this.data.senderPublicKey = undefined;
    }
    getStruct() {
        const struct = super.getStruct();
        struct.amount = this.data.amount;
        return struct;
    }
    instance() {
        return this;
    }
}
exports.DelegateResignationBuilder = DelegateResignationBuilder;
//# sourceMappingURL=delegate-resignation.js.map