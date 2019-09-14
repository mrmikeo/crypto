import ByteBuffer from "bytebuffer";
import { TransactionTypes } from "../../enums";
import { ISerializeOptions } from "../../interfaces";
import * as schemas from "./schemas";
import { Transaction } from "./transaction";
export declare class TransferTransaction extends Transaction {
    static type: TransactionTypes;
    static getSchema(): schemas.TransactionSchema;
    hasVendorField(): boolean;
    serialize(options?: ISerializeOptions): ByteBuffer;
    deserialize(buf: ByteBuffer): void;
}
