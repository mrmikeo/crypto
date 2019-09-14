import { ISchemaValidationResult, ITransactionData } from "../interfaces";
export declare class Verifier {
    static verify(data: ITransactionData): boolean;
    static verifySecondSignature(transaction: ITransactionData, publicKey: string): boolean;
    static verifyHash(data: ITransactionData): boolean;
    static verifySchema(data: ITransactionData, strict?: boolean): ISchemaValidationResult;
}
