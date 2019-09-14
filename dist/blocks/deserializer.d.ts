import { IBlockData, ITransaction } from "../interfaces";
declare class Deserializer {
    deserialize(serializedHex: string, headerOnly?: boolean): {
        data: IBlockData;
        transactions: ITransaction[];
    };
    private deserializeHeader;
    private deserializeTransactions;
}
export declare const deserializer: Deserializer;
export {};
