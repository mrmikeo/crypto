/// <reference types="node" />
import { ITransaction, ITransactionData } from "../interfaces";
declare class Deserializer {
    deserialize(serialized: string | Buffer): ITransaction;
    private deserializeCommon;
    private deserializeVendorField;
    private deserializeSignatures;
    private deserializeECDSA;
    private deserializeSchnorr;
    applyV1Compatibility(transaction: ITransactionData): void;
    private getByteBuffer;
}
export declare const deserializer: Deserializer;
export {};
