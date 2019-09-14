"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../../enums");
const managers_1 = require("../../../managers");
const utils_1 = require("../../../utils");
const transaction_1 = require("./transaction");
class IPFSBuilder extends transaction_1.TransactionBuilder {
    constructor() {
        super();
        this.data.type = enums_1.TransactionTypes.Ipfs;
        this.data.fee = managers_1.feeManager.get(enums_1.TransactionTypes.Ipfs);
        this.data.amount = utils_1.BigNumber.ZERO;
        this.data.asset = {};
    }
    ipfsAsset(ipfsId) {
        this.data.asset = {
            ipfs: ipfsId,
        };
        return this;
    }
    getStruct() {
        const struct = super.getStruct();
        struct.amount = this.data.amount;
        struct.asset = this.data.asset;
        return struct;
    }
    instance() {
        return this;
    }
}
exports.IPFSBuilder = IPFSBuilder;
//# sourceMappingURL=ipfs.js.map