/// <reference types="node" />
import { IBlockData } from "../interfaces";
export declare class Serializer {
    static serializeWithTransactions(block: IBlockData): Buffer;
    static serialize(block: IBlockData, includeSignature?: boolean): Buffer;
    private static serializeHeader;
    private static serializeSignature;
}
