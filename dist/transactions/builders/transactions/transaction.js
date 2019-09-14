"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const crypto_1 = require("../../../crypto");
const errors_1 = require("../../../errors");
const identities_1 = require("../../../identities");
const managers_1 = require("../../../managers");
const utils_1 = require("../../../utils");
const signer_1 = require("../../signer");
const verifier_1 = require("../../verifier");
class TransactionBuilder {
    constructor() {
        this.signWithSenderAsRecipient = false;
        this.data = {
            id: undefined,
            timestamp: crypto_1.Slots.getTime(),
            version: 0x01,
        };
    }
    build(data = {}) {
        return __1.TransactionFactory.fromData({ ...this.data, ...data }, false);
    }
    version(version) {
        this.data.version = version;
        return this.instance();
    }
    network(network) {
        this.data.network = network;
        return this.instance();
    }
    fee(fee) {
        if (fee) {
            this.data.fee = utils_1.BigNumber.make(fee);
        }
        return this.instance();
    }
    amount(amount) {
        this.data.amount = utils_1.BigNumber.make(amount);
        return this.instance();
    }
    recipientId(recipientId) {
        this.data.recipientId = recipientId;
        return this.instance();
    }
    senderPublicKey(publicKey) {
        this.data.senderPublicKey = publicKey;
        return this.instance();
    }
    vendorField(vendorField) {
        if (vendorField && Buffer.from(vendorField).length <= utils_1.maxVendorFieldLength()) {
            this.data.vendorField = vendorField;
        }
        return this.instance();
    }
    sign(passphrase) {
        const keys = identities_1.Keys.fromPassphrase(passphrase);
        this.data.senderPublicKey = keys.publicKey;
        if (this.signWithSenderAsRecipient) {
            this.data.recipientId = identities_1.Address.fromPublicKey(identities_1.Keys.fromPassphrase(passphrase).publicKey, this.data.network);
        }
        this.data.signature = signer_1.Signer.sign(this.getSigningObject(), keys);
        return this.instance();
    }
    signWithWif(wif, networkWif) {
        const keys = identities_1.Keys.fromWIF(wif, {
            wif: networkWif || managers_1.configManager.get("network.wif"),
        });
        this.data.senderPublicKey = keys.publicKey;
        if (this.signWithSenderAsRecipient) {
            this.data.recipientId = identities_1.Address.fromPublicKey(keys.publicKey, this.data.network);
        }
        this.data.signature = signer_1.Signer.sign(this.getSigningObject(), keys);
        return this.instance();
    }
    secondSign(secondPassphrase) {
        this.data.secondSignature = signer_1.Signer.secondSign(this.getSigningObject(), identities_1.Keys.fromPassphrase(secondPassphrase));
        return this.instance();
    }
    secondSignWithWif(wif, networkWif) {
        const keys = identities_1.Keys.fromWIF(wif, {
            wif: networkWif || managers_1.configManager.get("network.wif"),
        });
        this.data.secondSignature = signer_1.Signer.secondSign(this.getSigningObject(), keys);
        return this.instance();
    }
    multiSign(passphrase, index) {
        if (!this.data.signatures) {
            this.data.signatures = [];
        }
        this.version(2);
        const keys = identities_1.Keys.fromPassphrase(passphrase);
        signer_1.Signer.multiSign(this.getSigningObject(), keys, index);
        return this.instance();
    }
    verify() {
        return verifier_1.Verifier.verifyHash(this.data);
    }
    getStruct() {
        if (!this.data.senderPublicKey || (!this.data.signature && !this.data.signatures)) {
            throw new errors_1.MissingTransactionSignatureError();
        }
        const struct = {
            id: __1.Utils.getId(this.data).toString(),
            signature: this.data.signature,
            secondSignature: this.data.secondSignature,
            timestamp: this.data.timestamp,
            version: this.data.version,
            type: this.data.type,
            fee: this.data.fee,
            senderPublicKey: this.data.senderPublicKey,
            network: this.data.network,
        };
        if (Array.isArray(this.data.signatures)) {
            struct.signatures = this.data.signatures;
        }
        return struct;
    }
    getSigningObject() {
        const data = {
            ...this.data,
        };
        for (const key of Object.keys(data)) {
            if (["model", "network", "id"].includes(key)) {
                delete data[key];
            }
        }
        return data;
    }
}
exports.TransactionBuilder = TransactionBuilder;
//# sourceMappingURL=transaction.js.map