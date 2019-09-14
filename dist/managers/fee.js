"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const bignum_1 = require("../utils/bignum");
class FeeManager {
    constructor() {
        this.fees = {};
    }
    set(type, value) {
        this.fees[type] = bignum_1.BigNumber.make(value);
    }
    get(type) {
        return this.fees[type];
    }
    getForTransaction(transaction) {
        const fee = this.fees[transaction.type];
        if (transaction.type === enums_1.TransactionTypes.MultiSignature) {
            if (transaction.version === 2) {
                return fee.times(transaction.asset.multiSignature.publicKeys.length + 1);
            }
            else {
                return fee.times(transaction.asset.multiSignatureLegacy.keysgroup.length + 1);
            }
        }
        return fee;
    }
}
exports.FeeManager = FeeManager;
exports.feeManager = new FeeManager();
//# sourceMappingURL=fee.js.map