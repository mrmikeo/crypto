"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const enums_1 = require("../enums");
const errors_1 = require("../errors");
const identities_1 = require("../identities");
const managers_1 = require("../managers");
const utils_1 = require("../utils");
const types_1 = require("./types");
// Reference: https://github.com/ArkEcosystem/AIPs/blob/master/AIPS/aip-11.md
class Deserializer {
    deserialize(serialized) {
        const data = {};
        const buffer = this.getByteBuffer(serialized);
        this.deserializeCommon(data, buffer);
        const instance = types_1.TransactionTypeFactory.create(data);
        this.deserializeVendorField(instance, buffer);
        // Deserialize type specific parts
        instance.deserialize(buffer);
        this.deserializeSignatures(data, buffer);
        if (data.version === 1) {
            this.applyV1Compatibility(data);
        }
        else if (data.version === 2 && managers_1.configManager.getMilestone().aip11) {
            // TODO
        }
        else {
            throw new errors_1.TransactionVersionError(data.version);
        }
        instance.serialized = buffer.flip().toBuffer();
        return instance;
    }
    deserializeCommon(transaction, buf) {
        buf.skip(1); // Skip 0xFF marker
        transaction.version = buf.readUint8();
        transaction.network = buf.readUint8();
        transaction.type = buf.readUint8();
        transaction.timestamp = buf.readUint32();
        transaction.senderPublicKey = buf.readBytes(33).toString("hex");
        transaction.fee = utils_1.BigNumber.make(buf.readUint64().toString());
        transaction.amount = utils_1.BigNumber.ZERO;
    }
    deserializeVendorField(transaction, buf) {
        const vendorFieldLength = buf.readUint8();
        if (vendorFieldLength > 0) {
            if (transaction.hasVendorField()) {
                transaction.data.vendorFieldHex = buf.readBytes(vendorFieldLength).toString("hex");
            }
            else {
                buf.skip(vendorFieldLength);
            }
        }
    }
    deserializeSignatures(transaction, buf) {
        if (transaction.version === 1) {
            this.deserializeECDSA(transaction, buf);
        }
        else if (transaction.version === 2) {
            this.deserializeSchnorr(transaction, buf);
        }
    }
    deserializeECDSA(transaction, buf) {
        const currentSignatureLength = () => {
            buf.mark();
            const lengthHex = buf
                .skip(1)
                .readBytes(1)
                .toString("hex");
            buf.reset();
            return parseInt(lengthHex, 16) + 2;
        };
        // Signature
        if (buf.remaining()) {
            const signatureLength = currentSignatureLength();
            transaction.signature = buf.readBytes(signatureLength).toString("hex");
        }
        const beginningMultiSignature = () => {
            buf.mark();
            const marker = buf.readUint8();
            buf.reset();
            return marker === 255;
        };
        // Second Signature
        if (buf.remaining() && !beginningMultiSignature()) {
            const secondSignatureLength = currentSignatureLength();
            transaction.secondSignature = buf.readBytes(secondSignatureLength).toString("hex");
        }
        // Multi Signatures
        if (buf.remaining() && beginningMultiSignature()) {
            buf.skip(1);
            const multiSignature = buf.readBytes(buf.limit - buf.offset).toString("hex");
            transaction.signatures = [multiSignature];
        }
        if (buf.remaining()) {
            throw new errors_1.MalformedTransactionBytesError();
        }
    }
    deserializeSchnorr(transaction, buf) {
        const canReadNonMultiSignature = () => {
            return buf.remaining() && (buf.remaining() % 64 === 0 || buf.remaining() % 65 !== 0);
        };
        if (canReadNonMultiSignature()) {
            transaction.signature = buf.readBytes(64).toString("hex");
        }
        if (canReadNonMultiSignature()) {
            transaction.secondSignature = buf.readBytes(64).toString("hex");
        }
        if (buf.remaining()) {
            if (buf.remaining() % 65 === 0) {
                transaction.signatures = [];
                const count = buf.remaining() / 65;
                for (let i = 0; i < count; i++) {
                    const multiSignaturePart = buf.readBytes(65).toString("hex");
                    transaction.signatures.push(multiSignaturePart);
                }
            }
            else {
                throw new errors_1.MalformedTransactionBytesError();
            }
        }
    }
    // tslint:disable-next-line:member-ordering
    applyV1Compatibility(transaction) {
        transaction.secondSignature = transaction.secondSignature || transaction.signSignature;
        if (transaction.type === enums_1.TransactionTypes.Vote) {
            transaction.recipientId = identities_1.Address.fromPublicKey(transaction.senderPublicKey, transaction.network);
        }
        else if (transaction.type === enums_1.TransactionTypes.MultiSignature) {
            transaction.asset.multiSignatureLegacy.keysgroup = transaction.asset.multiSignatureLegacy.keysgroup.map(k => k.startsWith("+") ? k : `+${k}`);
        }
        if (transaction.vendorFieldHex) {
            transaction.vendorField = Buffer.from(transaction.vendorFieldHex, "hex").toString("utf8");
        }
    }
    getByteBuffer(serialized) {
        if (!(serialized instanceof Buffer)) {
            serialized = Buffer.from(serialized, "hex");
        }
        const buffer = new bytebuffer_1.default(serialized.length, true);
        buffer.append(serialized);
        buffer.reset();
        return buffer;
    }
}
exports.deserializer = new Deserializer();
//# sourceMappingURL=deserializer.js.map