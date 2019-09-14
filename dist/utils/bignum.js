"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class BigNumber extends bignumber_js_1.default {
    static make(value, base) {
        return new BigNumber(value, base);
    }
}
BigNumber.ZERO = BigNumber.make(0);
BigNumber.ONE = BigNumber.make(1);
BigNumber.SATOSHI = BigNumber.make(1e8);
exports.BigNumber = BigNumber;
BigNumber.config({ DECIMAL_PLACES: 0 });
//# sourceMappingURL=bignum.js.map