const test = require('tape');
const path = require('path');
const fse = require('fs-extra');
const ProskommaJsonValidator = require('../../src').default;

const testGroup = 'Smoke';

test(
    `Hello (${testGroup})`,
    async function (t) {
        try {
            t.plan(5);
            const validator = new ProskommaJsonValidator();
            t.throws(()=> validator.validate('banana', {}), 'Unknown');
            let validatorResult = validator.validate('perf', {});
            console.log(validatorResult)
            t.notOk(validatorResult.isValid);
            t.equal(validatorResult.errors.length, 1);
            t.ok(validatorResult.errors[0].message.includes("docSets"));
            const goodPerf = fse.readJsonSync(path.resolve(path.join('test', 'test_data', 'fra_lsg_jon.json')));
            t.ok(validator.validate('perf', goodPerf).isValid);
        } catch (err) {
            console.log(err);
        }
    },
);
