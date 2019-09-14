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
class MultiPaymentTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.multiPayment;
    }
    serialize(options) {
        const { data } = this;
        const buffer = new bytebuffer_1.default(64, true);
        buffer.writeUint32(data.asset.payments.length);
        for (const p of data.asset.payments) {
            buffer.writeUint64(+utils_1.BigNumber.make(p.amount).toFixed());
            buffer.append(bs58check_1.default.decode(p.recipientId));
        }
        return buffer;
    }
    deserialize(buf) {
        const { data } = this;
        const payments = [];
        const total = buf.readUint32();
        for (let j = 0; j < total; j++) {
            payments.push({
                amount: utils_1.BigNumber.make(buf.readUint64().toString()),
                recipientId: bs58check_1.default.encode(buf.readBytes(21).toBuffer()),
            });
        }
        data.amount = payments.reduce((a, p) => a.plus(p.amount), utils_1.BigNumber.ZERO);
        data.asset = { payments };
    }
}
MultiPaymentTransaction.type = enums_1.TransactionTypes.MultiPayment;
exports.MultiPaymentTransaction = MultiPaymentTransaction;
//# sourceMappingURL=multi-payment.js.map