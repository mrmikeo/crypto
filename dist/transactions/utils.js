"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("../crypto");
const managers_1 = require("../managers");
const serializer_1 = require("./serializer");
const factory_1 = require("./types/factory");
class Utils {
    static toBytes(data) {
        return serializer_1.Serializer.serialize(factory_1.TransactionTypeFactory.create(data));
    }
    static toHash(transaction, options) {
        return crypto_1.HashAlgorithms.sha256(serializer_1.Serializer.getBytes(transaction, options));
    }
    static getId(transaction) {
        const id = Utils.toHash(transaction).toString("hex");
        // Apply fix for broken type 1 and 4 transactions, which were
        // erroneously calculated with a recipient id.
        const { transactionIdFixTable } = managers_1.configManager.get("exceptions");
        if (transactionIdFixTable && transactionIdFixTable[id]) {
            return transactionIdFixTable[id];
        }
        return id;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map