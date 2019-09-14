"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bs58check_1 = __importDefault(require("bs58check"));
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const enums_1 = require("../../enums");
const utils_1 = require("../../utils");
const schemas = __importStar(require("./schemas"));
const transaction_1 = require("./transaction");
class TransferTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.transfer;
    }
    hasVendorField() {
        return true;
    }
    serialize(options) {
        const { data } = this;
        const buffer = new bytebuffer_1.default(24, true);
        buffer.writeUint64(+data.amount);
        buffer.writeUint32(data.expiration || 0);
        buffer.append(bs58check_1.default.decode(data.recipientId));
        return buffer;
    }
    deserialize(buf) {
        const { data } = this;
        data.amount = utils_1.BigNumber.make(buf.readUint64().toString());
        data.expiration = buf.readUint32();
        data.recipientId = bs58check_1.default.encode(buf.readBytes(21).toBuffer());
    }
}
TransferTransaction.type = enums_1.TransactionTypes.Transfer;
exports.TransferTransaction = TransferTransaction;
//# sourceMappingURL=transfer.js.map