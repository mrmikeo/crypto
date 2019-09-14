import { TransactionTypes } from "../enums";
import { ITransactionData } from "../interfaces";
import { BigNumber } from "../utils/bignum";
export declare class FeeManager {
    fees: Record<number, BigNumber>;
    set(type: TransactionTypes | number, value: number): void;
    get(type: TransactionTypes | number): BigNumber;
    getForTransaction(transaction: ITransactionData): BigNumber;
}
export declare const feeManager: FeeManager;
