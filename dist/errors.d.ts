export declare class CryptoError extends Error {
    constructor(message: string);
}
export declare class Bip38CompressionError extends CryptoError {
    constructor(expected: string | number, given: string | number);
}
export declare class Bip38LengthError extends CryptoError {
    constructor(expected: string | number, given: string | number);
}
export declare class Bip38PrefixError extends CryptoError {
    constructor(expected: string | number, given: string | number);
}
export declare class Bip38TypeError extends CryptoError {
    constructor(expected: string | number, given: string | number);
}
export declare class NetworkVersionError extends CryptoError {
    constructor(expected: string | number, given: string | number);
}
export declare class NotImplementedError extends CryptoError {
    constructor();
}
export declare class PrivateKeyLengthError extends CryptoError {
    constructor(expected: string | number, given: string | number);
}
export declare class PublicKeyError extends CryptoError {
    constructor(given: string);
}
export declare class TransactionTypeError extends CryptoError {
    constructor(given: string);
}
export declare class MalformedTransactionBytesError extends CryptoError {
    constructor();
}
export declare class TransactionSchemaError extends CryptoError {
    constructor(what: string);
}
export declare class TransactionVersionError extends CryptoError {
    constructor(given: number);
}
export declare class UnkownTransactionError extends CryptoError {
    constructor(given: number);
}
export declare class TransactionAlreadyRegisteredError extends CryptoError {
    constructor(name: string);
}
export declare class TransactionTypeInvalidRangeError extends CryptoError {
    constructor(given: number);
}
export declare class MissingMilestoneFeeError extends CryptoError {
    constructor(name: string);
}
export declare class MaximumPaymentCountExceededError extends CryptoError {
    constructor(given: number);
}
export declare class MissingTransactionSignatureError extends CryptoError {
    constructor();
}
export declare class BlockSchemaError extends CryptoError {
    constructor(height: number, what: string);
}
export declare class PreviousBlockIdFormatError extends CryptoError {
    constructor(thisBlockHeight: number, previousBlockId: string);
}
export declare class InvalidMilestoneConfigurationError extends CryptoError {
    constructor(message: string);
}
export declare class InvalidMultiSignatureAssetError extends CryptoError {
    constructor();
}
