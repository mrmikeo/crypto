import { TransactionConstructor } from "..";
import { TransactionTypes } from "../../enums";
import { ITransaction, ITransactionData } from "../../interfaces";
export declare class TransactionTypeFactory {
    static initialize(coreTypes: Map<TransactionTypes, TransactionConstructor>, customTypes: Map<TransactionTypes, TransactionConstructor>): void;
    static create(data: ITransactionData): ITransaction;
    static get(type: TransactionTypes | number): TransactionConstructor;
    private static coreTypes;
    private static customTypes;
}
