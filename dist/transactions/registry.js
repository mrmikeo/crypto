"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_camelcase_1 = __importDefault(require("lodash.camelcase"));
const errors_1 = require("../errors");
const managers_1 = require("../managers");
const fee_1 = require("../managers/fee");
const validation_1 = require("../validation");
const types_1 = require("./types");
class TransactionRegistry {
    constructor() {
        this.coreTypes = new Map();
        this.customTypes = new Map();
        types_1.TransactionTypeFactory.initialize(this.coreTypes, this.customTypes);
        this.registerCoreType(types_1.TransferTransaction);
        this.registerCoreType(types_1.SecondSignatureRegistrationTransaction);
        this.registerCoreType(types_1.DelegateRegistrationTransaction);
        this.registerCoreType(types_1.VoteTransaction);
        this.registerCoreType(types_1.MultiSignatureRegistrationTransaction);
        this.registerCoreType(types_1.IpfsTransaction);
        this.registerCoreType(types_1.TimelockTransferTransaction);
        this.registerCoreType(types_1.MultiPaymentTransaction);
        this.registerCoreType(types_1.DelegateResignationTransaction);
    }
    registerCustomType(constructor) {
        const { type } = constructor;
        if (this.customTypes.has(type)) {
            throw new errors_1.TransactionAlreadyRegisteredError(constructor.name);
        }
        if (type < 100) {
            throw new errors_1.TransactionTypeInvalidRangeError(type);
        }
        this.customTypes.set(type, constructor);
        this.updateSchemas(constructor);
        this.updateStaticFees();
    }
    deregisterCustomType(type) {
        if (this.customTypes.has(type)) {
            const schema = this.customTypes.get(type);
            this.updateSchemas(schema, true);
            this.customTypes.delete(type);
        }
    }
    updateStaticFees(height) {
        const customConstructors = Array.from(this.customTypes.values());
        const milestone = managers_1.configManager.getMilestone(height);
        const { staticFees } = milestone.fees;
        for (const constructor of customConstructors) {
            const { type, name } = constructor;
            if (milestone.fees && milestone.fees.staticFees) {
                const value = staticFees[lodash_camelcase_1.default(name.replace("Transaction", ""))];
                if (!value) {
                    throw new errors_1.MissingMilestoneFeeError(name);
                }
                fee_1.feeManager.set(type, value);
            }
        }
    }
    registerCoreType(constructor) {
        const { type } = constructor;
        if (this.coreTypes.has(type)) {
            throw new errors_1.TransactionAlreadyRegisteredError(constructor.name);
        }
        this.coreTypes.set(type, constructor);
        this.updateSchemas(constructor);
    }
    updateSchemas(transaction, remove) {
        validation_1.validator.extendTransaction(transaction.getSchema(), remove);
    }
}
exports.transactionRegistry = new TransactionRegistry();
//# sourceMappingURL=registry.js.map