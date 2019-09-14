"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv_keywords_1 = __importDefault(require("ajv-keywords"));
const schemas_1 = require("../transactions/types/schemas");
const formats_1 = require("./formats");
const keywords_1 = require("./keywords");
const schemas_2 = require("./schemas");
class Validator {
    constructor(options) {
        this.transactionSchemas = new Set();
        const ajv = new ajv_1.default({
            ...{
                $data: true,
                schemas: schemas_2.schemas,
                removeAdditional: true,
                extendRefs: true,
            },
            ...options,
        });
        ajv_keywords_1.default(ajv);
        for (const addKeyword of keywords_1.keywords) {
            addKeyword(ajv);
        }
        for (const addFormat of formats_1.formats) {
            addFormat(ajv);
        }
        this.ajv = ajv;
    }
    static make(options = {}) {
        return new Validator(options);
    }
    getInstance() {
        return this.ajv;
    }
    validate(schemaKeyRef, data) {
        try {
            this.ajv.validate(schemaKeyRef, data);
            const error = this.ajv.errors ? this.ajv.errorsText() : undefined;
            return { value: data, error, errors: this.ajv.errors };
        }
        catch (error) {
            return { value: undefined, error: error.stack, errors: [] };
        }
    }
    addFormat(name, format) {
        this.ajv.addFormat(name, format);
    }
    addKeyword(keyword, definition) {
        this.ajv.addKeyword(keyword, definition);
    }
    addSchema(schema, key) {
        this.ajv.addSchema(schema, key);
    }
    removeKeyword(keyword) {
        this.ajv.removeKeyword(keyword);
    }
    removeSchema(schemaKeyRef) {
        this.ajv.removeSchema(schemaKeyRef);
    }
    extendTransaction(schema, remove) {
        if (remove) {
            this.transactionSchemas.delete(schema.$id);
            this.ajv.removeSchema(schema.$id);
            this.ajv.removeSchema(`${schema.$id}Signed`);
            this.ajv.removeSchema(`${schema.$id}Strict`);
        }
        else {
            this.transactionSchemas.add(schema.$id);
            this.ajv.addSchema(schema);
            this.ajv.addSchema(schemas_1.signedSchema(schema));
            this.ajv.addSchema(schemas_1.strictSchema(schema));
        }
        this.updateTransactionArray();
    }
    updateTransactionArray() {
        this.ajv.removeSchema("block");
        this.ajv.removeSchema("transactions");
        this.ajv.addSchema({
            $id: "transactions",
            type: "array",
            additionalItems: false,
            items: { anyOf: [...this.transactionSchemas].map(schema => ({ $ref: `${schema}Signed` })) },
        });
        this.ajv.addSchema(schemas_2.schemas.block);
    }
}
exports.Validator = Validator;
exports.validator = Validator.make();
//# sourceMappingURL=index.js.map