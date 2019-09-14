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
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const enums_1 = require("../../enums");
const schemas = __importStar(require("./schemas"));
const transaction_1 = require("./transaction");
class DelegateResignationTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.delegateResignation;
    }
    serialize(options) {
        return new bytebuffer_1.default(0);
    }
    deserialize(buf) {
        return;
    }
}
DelegateResignationTransaction.type = enums_1.TransactionTypes.DelegateResignation;
exports.DelegateResignationTransaction = DelegateResignationTransaction;
//# sourceMappingURL=delegate-resignation.js.map