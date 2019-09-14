import { ITransactionData } from "../../../interfaces";
import { TransactionBuilder } from "./transaction";
export declare class TimelockTransferBuilder extends TransactionBuilder<TimelockTransferBuilder> {
    constructor();
    timelock(timelock: number, timelockType: number): TimelockTransferBuilder;
    getStruct(): ITransactionData;
    protected instance(): TimelockTransferBuilder;
}
