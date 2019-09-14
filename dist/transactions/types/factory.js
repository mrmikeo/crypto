"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
class TransactionTypeFactory {
    static initialize(coreTypes, customTypes) {
        this.coreTypes = coreTypes;
        this.customTypes = customTypes;
    }
    static create(data) {
        const instance = new (this.get(data.type))();
        instance.data = data;
        return instance;
    }
    static get(type) {
        if (this.coreTypes.has(type)) {
            return this.coreTypes.get(type);
        }
        if (this.customTypes.has(type)) {
            return this.customTypes.get(type);
        }
        throw new errors_1.UnkownTransactionError(type);
    }
}
exports.TransactionTypeFactory = TransactionTypeFactory;
//# sourceMappingURL=factory.js.map