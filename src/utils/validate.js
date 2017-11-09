// @flow
import Ajv from 'ajv';
import { diff } from 'deep-diff';

const ajv = new Ajv({
    allErrors: true,
    removeAdditional: true,
});

export default function validate(json: Object, schema: Object) {
    const orig = JSON.parse(JSON.stringify(json));
    const validator = ajv.compile(schema);
    const isValid = validator(json);

    const differences = diff(orig, json) || [];
    const warnings = differences.reduce((msgs, record) => {
        if (record.kind === 'D') {
            msgs.push(`Unknown property: data.${record.path.join('.')}`);
        }
        return msgs;
    }, []);

    return {
        errors: !isValid ? validator.errors.map((e) => ajv.errorsText([e])) : [],
        warnings,
    };
}
