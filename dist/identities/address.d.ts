import { IMultiSignatureAsset } from "../interfaces";
export declare class Address {
    static fromPassphrase(passphrase: string, networkVersion?: number): string;
    static fromPublicKey(publicKey: string, networkVersion?: number): string;
    static fromMultiSignatureAsset(asset: IMultiSignatureAsset, networkVersion?: number): string;
    static fromPrivateKey(privateKey: any, networkVersion?: number): string;
    static validate(address: string, networkVersion?: number): boolean;
}
