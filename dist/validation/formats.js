"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const vendorField = (ajv) => {
    ajv.addFormat("vendorField", data => {
        try {
            return Buffer.from(data, "utf8").length <= utils_1.maxVendorFieldLength();
        }
        catch (_a) {
            return false;
        }
    });
};
const vendorFieldHex = (ajv) => {
    ajv.addFormat("vendorFieldHex", data => {
        try {
            if (/^[0123456789A-Fa-f]+$/.test(data)) {
                return Buffer.from(data, "hex").length <= utils_1.maxVendorFieldLength();
            }
        }
        catch (_a) {
            return false;
        }
        return false;
    });
};
exports.formats = [vendorField, vendorFieldHex];
//# sourceMappingURL=formats.js.map