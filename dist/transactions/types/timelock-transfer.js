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
class TimelockTransferTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.timelockTransfer;
    }
    serialize(options) {
        const { data } = this;
        const buffer = new bytebuffer_1.default(4 + 1 + 4 + 24, true);
        buffer.writeUint64(+data.amount.toFixed());
        buffer.writeByte(data.timelockType);
        buffer.writeUint64(data.timelock);
        buffer.append(bs58check_1.default.decode(data.recipientId));
        return buffer;
    }
    deserialize(buf) {
        const { data } = this;
        data.amount = utils_1.BigNumber.make(buf.readUint64().toString());
        data.timelockType = buf.readUint8();
        data.timelock = buf.readUint64().toNumber();
        data.recipientId = bs58check_1.default.encode(buf.readBytes(21).toBuffer());
    }
}
TimelockTransferTransaction.type = enums_1.TransactionTypes.TimelockTransfer;
exports.TimelockTransferTransaction = TimelockTransferTransaction;
//# sourceMappingURL=timelock-transfer.js.map