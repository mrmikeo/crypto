"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const managers_1 = require("../managers");
const bignum_1 = require("./bignum");
exports.BigNumber = bignum_1.BigNumber;
let genesisTransactions;
let currentNetwork;
/**
 * Get human readable string from satoshis
 */
exports.formatSatoshi = (amount) => {
    const localeString = (+amount / constants_1.SATOSHI).toLocaleString("en", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
    });
    return `${localeString} ${managers_1.configManager.get("network.client.symbol")}`;
};
/**
 * Check if the given block or transaction id is an exception.
 */
exports.isException = (blockOrTransaction) => {
    return ["blocks", "transactions"].some(key => {
        const exceptions = managers_1.configManager.get(`exceptions.${key}`);
        return Array.isArray(exceptions) && exceptions.includes(blockOrTransaction.id);
    });
};
/**
 * Sort transactions by type, then id.
 */
exports.sortTransactions = (transactions) => {
    return transactions.sort((a, b) => {
        if (a.type < b.type) {
            return -1;
        }
        if (a.type > b.type) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    });
};
exports.isGenesisTransaction = (id) => {
    const network = managers_1.configManager.get("network.pubKeyHash");
    if (!genesisTransactions || currentNetwork !== network) {
        currentNetwork = network;
        genesisTransactions = managers_1.configManager
            .get("genesisBlock.transactions")
            .reduce((acc, curr) => Object.assign(acc, { [curr.id]: true }), {});
    }
    return genesisTransactions[id];
};
exports.numberToHex = (num, padding = 2) => {
    const indexHex = Number(num).toString(16);
    return "0".repeat(padding - indexHex.length) + indexHex;
};
exports.maxVendorFieldLength = (height) => managers_1.configManager.getMilestone(height).vendorFieldLength;
//# sourceMappingURL=index.js.map