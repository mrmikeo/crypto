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
const bs58_1 = __importDefault(require("bs58"));
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const enums_1 = require("../../enums");
const schemas = __importStar(require("./schemas"));
const transaction_1 = require("./transaction");
class IpfsTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.ipfs;
    }
    serialize(options) {
        const { data } = this;
        const ipfsBuffer = bs58_1.default.decode(data.asset.ipfs);
        const buffer = new bytebuffer_1.default(ipfsBuffer.length, true);
        buffer.append(ipfsBuffer, "hex");
        return buffer;
    }
    deserialize(buf) {
        const { data } = this;
        const hashFunction = buf.readUint8();
        const ipfsHashLength = buf.readUint8();
        const ipfsHash = buf.readBytes(ipfsHashLength).toBuffer();
        const buffer = new Buffer(ipfsHashLength + 2);
        buffer.writeUInt8(hashFunction, 0);
        buffer.writeUInt8(ipfsHashLength, 1);
        buffer.fill(ipfsHash, 2);
        data.asset = {
            ipfs: bs58_1.default.encode(buffer),
        };
    }
}
IpfsTransaction.type = enums_1.TransactionTypes.Ipfs;
exports.IpfsTransaction = IpfsTransaction;
//# sourceMappingURL=ipfs.js.map