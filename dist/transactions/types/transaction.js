"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
const verifier_1 = require("../verifier");
class Transaction {
    get id() {
        return this.data.id;
    }
    get type() {
        return this.data.type;
    }
    get verified() {
        return this.isVerified;
    }
    static getSchema() {
        throw new errors_1.NotImplementedError();
    }
    verify() {
        return verifier_1.Verifier.verify(this.data);
    }
    verifySecondSignature(publicKey) {
        return verifier_1.Verifier.verifySecondSignature(this.data, publicKey);
    }
    verifySchema() {
        return verifier_1.Verifier.verifySchema(this.data);
    }
    toJson() {
        const data = JSON.parse(JSON.stringify(this.data));
        data.amount = this.data.amount.toFixed();
        data.fee = this.data.fee.toFixed();
        if (!data.vendorFieldHex) {
            delete data.vendorFieldHex;
        }
        return data;
    }
    hasVendorField() {
        return false;
    }
}
Transaction.type = undefined;
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map