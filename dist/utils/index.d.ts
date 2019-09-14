import { IBlockData, ITransactionData } from "../interfaces";
import { BigNumber } from "./bignum";
/**
 * Get human readable string from satoshis
 */
export declare const formatSatoshi: (amount: BigNumber) => string;
/**
 * Check if the given block or transaction id is an exception.
 */
export declare const isException: (blockOrTransaction: ITransactionData | IBlockData) => boolean;
/**
 * Sort transactions by type, then id.
 */
export declare const sortTransactions: (transactions: ITransactionData[]) => ITransactionData[];
export declare const isGenesisTransaction: (id: string) => boolean;
export declare const numberToHex: (num: number, padding?: number) => string;
export declare const maxVendorFieldLength: (height?: number) => number;
export { BigNumber };
