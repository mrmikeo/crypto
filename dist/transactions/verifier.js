"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = require("../crypto/hash");
const managers_1 = require("../managers");
const utils_1 = require("../utils");
const validation_1 = require("../validation");
const types_1 = require("./types");
const utils_2 = require("./utils");
class Verifier {
    static verify(data) {
        if (utils_1.isException(data)) {
            return true;
        }
        if (data.type >= 4 && data.type <= 99 && !managers_1.configManager.getMilestone().aip11) {
            return false;
        }
        return Verifier.verifyHash(data);
    }
    static verifySecondSignature(transaction, publicKey) {
        const secondSignature = transaction.secondSignature || transaction.signSignature;
        if (!secondSignature) {
            return false;
        }
        const hash = utils_2.Utils.toHash(transaction, { excludeSecondSignature: true });
        if (transaction.version === 2) {
            return hash_1.Hash.verifySchnorr(hash, secondSignature, publicKey);
        }
        else {
            return hash_1.Hash.verifyECDSA(hash, secondSignature, publicKey);
        }
    }
    static verifyHash(data) {
        const { signature, senderPublicKey } = data;
        if (!signature) {
            return false;
        }
        const hash = utils_2.Utils.toHash(data, {
            excludeSignature: true,
            excludeSecondSignature: true,
        });
        if (data.version === 2) {
            return hash_1.Hash.verifySchnorr(hash, signature, senderPublicKey);
        }
        else {
            return hash_1.Hash.verifyECDSA(hash, signature, senderPublicKey);
        }
    }
    static verifySchema(data, strict = true) {
        const { $id } = types_1.TransactionTypeFactory.get(data.type).getSchema();
        return validation_1.validator.validate(strict ? `${$id}Strict` : `${$id}`, data);
    }
}
exports.Verifier = Verifier;
//# sourceMappingURL=verifier.js.map