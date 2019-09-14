"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../../enums");
const managers_1 = require("../../../managers");
const utils_1 = require("../../../utils");
const transaction_1 = require("./transaction");
class TimelockTransferBuilder extends transaction_1.TransactionBuilder {
    constructor() {
        super();
        this.data.type = enums_1.TransactionTypes.TimelockTransfer;
        this.data.fee = managers_1.feeManager.get(enums_1.TransactionTypes.TimelockTransfer);
        this.data.amount = utils_1.BigNumber.ZERO;
        this.data.recipientId = undefined;
        this.data.senderPublicKey = undefined;
        this.data.timelockType = 0x00;
        this.data.timelock = undefined;
        this.data.asset = {};
    }
    timelock(timelock, timelockType) {
        this.data.timelock = timelock;
        this.data.timelockType = timelockType;
        return this;
    }
    getStruct() {
        const struct = super.getStruct();
        struct.amount = this.data.amount;
        struct.recipientId = this.data.recipientId;
        struct.vendorFieldHex = this.data.vendorFieldHex;
        struct.vendorField = this.data.vendorField;
        struct.asset = this.data.asset;
        struct.timelock = this.data.timelock;
        struct.timelockType = this.data.timelockType;
        return struct;
    }
    instance() {
        return this;
    }
}
exports.TimelockTransferBuilder = TimelockTransferBuilder;
//# sourceMappingURL=timelock-transfer.js.map