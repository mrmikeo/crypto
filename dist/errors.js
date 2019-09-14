"use strict";
// tslint:disable:max-classes-per-file
Object.defineProperty(exports, "__esModule", { value: true });
class CryptoError extends Error {
    constructor(message) {
        super(message);
        Object.defineProperty(this, "message", {
            enumerable: false,
            value: message,
        });
        Object.defineProperty(this, "name", {
            enumerable: false,
            value: this.constructor.name,
        });
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CryptoError = CryptoError;
class Bip38CompressionError extends CryptoError {
    constructor(expected, given) {
        super(`Expected flag to be ${expected}, but got ${given}.`);
    }
}
exports.Bip38CompressionError = Bip38CompressionError;
class Bip38LengthError extends CryptoError {
    constructor(expected, given) {
        super(`Expected length to be ${expected}, but got ${given}.`);
    }
}
exports.Bip38LengthError = Bip38LengthError;
class Bip38PrefixError extends CryptoError {
    constructor(expected, given) {
        super(`Expected prefix to be ${expected}, but got ${given}.`);
    }
}
exports.Bip38PrefixError = Bip38PrefixError;
class Bip38TypeError extends CryptoError {
    constructor(expected, given) {
        super(`Expected type to be ${expected}, but got ${given}.`);
    }
}
exports.Bip38TypeError = Bip38TypeError;
class NetworkVersionError extends CryptoError {
    constructor(expected, given) {
        super(`Expected version to be ${expected}, but got ${given}.`);
    }
}
exports.NetworkVersionError = NetworkVersionError;
class NotImplementedError extends CryptoError {
    constructor() {
        super(`Feature is not available.`);
    }
}
exports.NotImplementedError = NotImplementedError;
class PrivateKeyLengthError extends CryptoError {
    constructor(expected, given) {
        super(`Expected length to be ${expected}, but got ${given}.`);
    }
}
exports.PrivateKeyLengthError = PrivateKeyLengthError;
class PublicKeyError extends CryptoError {
    constructor(given) {
        super(`Expected ${given} to be a valid public key.`);
    }
}
exports.PublicKeyError = PublicKeyError;
class TransactionTypeError extends CryptoError {
    constructor(given) {
        super(`Type ${given} not supported.`);
    }
}
exports.TransactionTypeError = TransactionTypeError;
class MalformedTransactionBytesError extends CryptoError {
    constructor() {
        super(`Failed to deserialize transaction, because the bytes are malformed.`);
    }
}
exports.MalformedTransactionBytesError = MalformedTransactionBytesError;
class TransactionSchemaError extends CryptoError {
    constructor(what) {
        super(what);
    }
}
exports.TransactionSchemaError = TransactionSchemaError;
class TransactionVersionError extends CryptoError {
    constructor(given) {
        super(`Version ${given} not supported.`);
    }
}
exports.TransactionVersionError = TransactionVersionError;
class UnkownTransactionError extends CryptoError {
    constructor(given) {
        super(`Transaction type ${given} is not registered.`);
    }
}
exports.UnkownTransactionError = UnkownTransactionError;
class TransactionAlreadyRegisteredError extends CryptoError {
    constructor(name) {
        super(`Transaction type ${name} is already registered.`);
    }
}
exports.TransactionAlreadyRegisteredError = TransactionAlreadyRegisteredError;
class TransactionTypeInvalidRangeError extends CryptoError {
    constructor(given) {
        super(`Custom transaction type must be in the range 100-255 (${given}).`);
    }
}
exports.TransactionTypeInvalidRangeError = TransactionTypeInvalidRangeError;
class MissingMilestoneFeeError extends CryptoError {
    constructor(name) {
        super(`Missing milestone fee for '${name}'.`);
    }
}
exports.MissingMilestoneFeeError = MissingMilestoneFeeError;
class MaximumPaymentCountExceededError extends CryptoError {
    constructor(given) {
        super(`Expected a maximum of 2258 payments, but got ${given}.`);
    }
}
exports.MaximumPaymentCountExceededError = MaximumPaymentCountExceededError;
class MissingTransactionSignatureError extends CryptoError {
    constructor() {
        super(`Expected the transaction to be signed.`);
    }
}
exports.MissingTransactionSignatureError = MissingTransactionSignatureError;
class BlockSchemaError extends CryptoError {
    constructor(height, what) {
        super(`Height (${height}): ${what}`);
    }
}
exports.BlockSchemaError = BlockSchemaError;
class PreviousBlockIdFormatError extends CryptoError {
    constructor(thisBlockHeight, previousBlockId) {
        super(`The config denotes that the block at height ${thisBlockHeight - 1} ` +
            `must use full SHA256 block id, but the next block (at ${thisBlockHeight}) ` +
            `contains previous block id "${previousBlockId}"`);
    }
}
exports.PreviousBlockIdFormatError = PreviousBlockIdFormatError;
class InvalidMilestoneConfigurationError extends CryptoError {
    constructor(message) {
        super(message);
    }
}
exports.InvalidMilestoneConfigurationError = InvalidMilestoneConfigurationError;
class InvalidMultiSignatureAssetError extends CryptoError {
    constructor() {
        super(`The multi signature asset is invalid.`);
    }
}
exports.InvalidMultiSignatureAssetError = InvalidMultiSignatureAssetError;
//# sourceMappingURL=errors.js.map