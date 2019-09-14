/// <reference types="node" />
/// <reference types="bytebuffer" />
import { TransactionTypes } from "../../enums";
import { ISchemaValidationResult, ITransaction, ITransactionData, ITransactionJson } from "../../interfaces";
import { TransactionSchema } from "./schemas";
export declare abstract class Transaction implements ITransaction {
    readonly id: string;
    readonly type: TransactionTypes;
    readonly verified: boolean;
    static type: TransactionTypes;
    static getSchema(): TransactionSchema;
    isVerified: boolean;
    data: ITransactionData;
    serialized: Buffer;
    timestamp: number;
    abstract serialize(): ByteBuffer;
    abstract deserialize(buf: ByteBuffer): void;
    verify(): boolean;
    verifySecondSignature(publicKey: string): boolean;
    verifySchema(): ISchemaValidationResult;
    toJson(): ITransactionJson;
    hasVendorField(): boolean;
}
