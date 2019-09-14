import BigNumberJS from "bignumber.js";
declare class BigNumber extends BigNumberJS {
    static readonly ZERO: BigNumber;
    static readonly ONE: BigNumber;
    static readonly SATOSHI: BigNumber;
    static make(value: BigNumberJS.Value, base?: number): BigNumber;
}
export { BigNumber };
