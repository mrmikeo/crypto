export declare const mainnet: {
    exceptions: {
        "blocks": string[];
        "transactions": string[];
        "outlookTable": {
        "3f8a34fd496e7656c25ec8c0b8fbbbd75780e4c1546ff366a3bb4e1786c2930f": string;
        "b361f800a7f87533ff8f73d9f02f1b3287c58f9f1e2ff78dd6ece6a6fcad59cc": string;
        "ac1b13f9068f44c1d9132693c58dfa2f0f370e92fcd5bb8ec8f0329ae2bd681e": string;
        "789b77ffe053b298b6e99dfc23753aeb6317a84fbc159cbae2b46903d188ff06": string;
        "0870ce6b2e9f9c0553c07870f11092c14e2c6bce2568a4c7a89c6754e877c1d4": string;
        };
        "transactionIdFixTable": {
        };
        "wrongTransactionOrder": {
        };
    };
    genesisBlock: {
        "version": number;
        "totalAmount": string;
        "totalFee": string;
        "reward": string;
        "payloadHash": string;
        "timestamp": number;
        "numberOfTransactions": number;
        "payloadLength": number;
        "previousBlock": any;
        "generatorPublicKey": string;
        "transactions": ({
            "type": number;
            "amount": string;
            "fee": string;
            "recipientId": string;
            "timestamp": number;
            "asset": {
                "delegate"?: undefined;
            };
            "senderPublicKey": string;
            "signature": string;
            "id": string;
        } | {
            "type": number;
            "amount": string;
            "fee": string;
            "recipientId": any;
            "senderPublicKey": string;
            "timestamp": number;
            "asset": {
                "delegate": {
                    "username": string;
                    "publicKey": string;
                };
            };
            "signature": string;
            "id": string;
        })[];
        "height": number;
        "id": string;
        "blockSignature": string;
    };
    milestones: ({
        "height": number;
        "reward": number;
        "activeDelegates": number;
        "blocktime": number;
        "block": {
            "version": number;
            "maxTransactions": number;
            "maxPayload": number;
            "acceptExpiredTransactionTimestamps": boolean;
            "idFullSha256"?: undefined;
        };
        "epoch": string;
        "fees": {
            "staticFees": {
                "transfer": number;
                "secondSignature": number;
                "delegateRegistration": number;
                "vote": number;
                "multiSignature": number;
                "ipfs": number;
                "timelockTransfer": number;
                "multiPayment": number;
                "delegateResignation": number;
            };
        };
        "vendorFieldLength": number;
    } | {
        "height": number;
        "reward": number;
        "activeDelegates"?: undefined;
        "blocktime"?: undefined;
        "block"?: undefined;
        "epoch"?: undefined;
        "fees"?: undefined;
        "vendorFieldLength"?: undefined;
    } | {
        "height": number;
        "block": {
            "maxTransactions": number;
            "maxPayload": number;
            "version"?: undefined;
            "acceptExpiredTransactionTimestamps"?: undefined;
            "idFullSha256"?: undefined;
        };
        "reward"?: undefined;
        "activeDelegates"?: undefined;
        "blocktime"?: undefined;
        "epoch"?: undefined;
        "fees"?: undefined;
        "vendorFieldLength"?: undefined;
    } | {
        "height": number;
        "vendorFieldLength": number;
        "reward"?: undefined;
        "activeDelegates"?: undefined;
        "blocktime"?: undefined;
        "block"?: undefined;
        "epoch"?: undefined;
        "fees"?: undefined;
    } | {
        "height": number;
        "block": {
            "idFullSha256": boolean;
            "version"?: undefined;
            "maxTransactions"?: undefined;
            "maxPayload"?: undefined;
            "acceptExpiredTransactionTimestamps"?: undefined;
        };
        "reward"?: undefined;
        "activeDelegates"?: undefined;
        "blocktime"?: undefined;
        "epoch"?: undefined;
        "fees"?: undefined;
        "vendorFieldLength"?: undefined;
    } | {
        "height": number;
        "block": {
            "acceptExpiredTransactionTimestamps": boolean;
            "version"?: undefined;
            "maxTransactions"?: undefined;
            "maxPayload"?: undefined;
            "idFullSha256"?: undefined;
        };
        "reward"?: undefined;
        "activeDelegates"?: undefined;
        "blocktime"?: undefined;
        "epoch"?: undefined;
        "fees"?: undefined;
        "vendorFieldLength"?: undefined;
    })[];
    network: {
        "name": string;
        "messagePrefix": string;
        "bip32": {
            "public": number;
            "private": number;
        };
        "pubKeyHash": number;
        "nethash": string;
        "wif": number;
        "slip44": number;
        "aip20": number;
        "client": {
            "token": string;
            "symbol": string;
            "explorer": string;
        };
    };
};
