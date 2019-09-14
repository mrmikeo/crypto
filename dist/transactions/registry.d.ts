import { Transaction } from "./types";
export declare type TransactionConstructor = typeof Transaction;
declare class TransactionRegistry {
    private readonly coreTypes;
    private readonly customTypes;
    constructor();
    registerCustomType(constructor: TransactionConstructor): void;
    deregisterCustomType(type: number): void;
    updateStaticFees(height?: number): void;
    private registerCoreType;
    private updateSchemas;
}
export declare const transactionRegistry: TransactionRegistry;
export {};
