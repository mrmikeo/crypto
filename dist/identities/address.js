"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bs58check_1 = __importDefault(require("bs58check"));
const crypto_1 = require("../crypto");
const errors_1 = require("../errors");
const managers_1 = require("../managers");
const public_key_1 = require("./public-key");
class Address {
    static fromPassphrase(passphrase, networkVersion) {
        return Address.fromPublicKey(public_key_1.PublicKey.fromPassphrase(passphrase), networkVersion);
    }
    static fromPublicKey(publicKey, networkVersion) {
        if (!/^[0-9A-Fa-f]{66}$/.test(publicKey)) {
            throw new errors_1.PublicKeyError(publicKey);
        }
        if (!networkVersion) {
            networkVersion = managers_1.configManager.get("network.pubKeyHash");
        }
        const buffer = crypto_1.HashAlgorithms.ripemd160(Buffer.from(publicKey, "hex"));
        const payload = Buffer.alloc(21);
        payload.writeUInt8(networkVersion, 0);
        buffer.copy(payload, 1);
        return bs58check_1.default.encode(payload);
    }
    static fromMultiSignatureAsset(asset, networkVersion) {
        return this.fromPublicKey(public_key_1.PublicKey.fromMultiSignatureAsset(asset), networkVersion);
    }
    static fromPrivateKey(privateKey, networkVersion) {
        return Address.fromPublicKey(privateKey.publicKey, networkVersion);
    }
    static validate(address, networkVersion) {
        if (!networkVersion) {
            networkVersion = managers_1.configManager.get("network.pubKeyHash");
        }
        try {
            return bs58check_1.default.decode(address)[0] === networkVersion;
        }
        catch (err) {
            return false;
        }
    }
}
exports.Address = Address;
//# sourceMappingURL=address.js.map