"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const errors_1 = require("../errors");
const config_1 = require("../managers/config");
const transactions_1 = require("../transactions");
const block_1 = require("./block");
class Serializer {
    static serializeWithTransactions(block) {
        const transactions = block.transactions || [];
        block.numberOfTransactions = block.numberOfTransactions || transactions.length;
        const serializedHeader = this.serialize(block);
        const buffer = new bytebuffer_1.default(serializedHeader.length + transactions.length * 4, true)
            .append(serializedHeader)
            .skip(transactions.length * 4);
        for (let i = 0; i < transactions.length; i++) {
            const serialized = transactions_1.Utils.toBytes(transactions[i]);
            buffer.writeUint32(serialized.length, serializedHeader.length + i * 4);
            buffer.append(serialized);
        }
        return buffer.flip().toBuffer();
    }
    static serialize(block, includeSignature = true) {
        const buffer = new bytebuffer_1.default(512, true);
        this.serializeHeader(block, buffer);
        if (includeSignature) {
            this.serializeSignature(block, buffer);
        }
        return buffer.flip().toBuffer();
    }
    static serializeHeader(block, buffer) {
        const constants = config_1.configManager.getMilestone(block.height - 1 || 1);
        if (constants.block.idFullSha256) {
            if (block.previousBlock.length !== 64) {
                throw new errors_1.PreviousBlockIdFormatError(block.height, block.previousBlock);
            }
            block.previousBlockHex = block.previousBlock;
        }
        else {
            block.previousBlockHex = block_1.Block.toBytesHex(block.previousBlock);
        }
        buffer.writeUint32(block.version);
        buffer.writeUint32(block.timestamp);
        buffer.writeUint32(block.height);
        buffer.append(block.previousBlockHex, "hex");
        buffer.writeUint32(block.numberOfTransactions);
        buffer.writeUint64(+block.totalAmount.toFixed());
        buffer.writeUint64(+block.totalFee.toFixed());
        buffer.writeUint64(+block.reward.toFixed());
        buffer.writeUint32(block.payloadLength);
        buffer.append(block.payloadHash, "hex");
        buffer.append(block.generatorPublicKey, "hex");
    }
    static serializeSignature(block, buffer) {
        if (block.blockSignature) {
            buffer.append(block.blockSignature, "hex");
        }
    }
}
exports.Serializer = Serializer;
//# sourceMappingURL=serializer.js.map