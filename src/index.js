import Ajv from 'ajv';
import perfSchema from './perf_schema';

class ProskommaJsonValidator {

    constructor() {
        this.schema = {};
        for (const [key, schema] of [['perf', perfSchema]]) {
            this.schema[key] = schema;
        }
    }

    validate(schemaKey, data) {
        if (!(schemaKey)) {
            throw new Error(`Unknown schema key '${schemaKey}'`)
        }
        const validator = new Ajv().compile(this.schema[schemaKey]);
        return {
            schemaKey,
            isValid: validator(data),
            errors: validator.errors,
        };
    }


};

export default ProskommaJsonValidator;
