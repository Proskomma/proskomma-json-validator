const test = require('tape');
const path = require('path');
const fse = require('fs-extra');
const ProskommaJsonValidator = require('../../src').default;

const testGroup = 'Smoke';

test(
    `Hello (${testGroup})`,
    async function (t) {
        try {
            t.plan(3);
            const validator = new ProskommaJsonValidator();
            t.throws(()=> validator.validate('banana', {}), 'Unknown');
            t.notOk(validator.validate('perf', {}));
            const goodPerf = fse.readJsonSync(path.resolve(path.join('test', 'test_data', 'fra_lsg_jon.json')));
            t.ok(validator.validate('perf', goodPerf));
        } catch (err) {
            console.log(err);
        }
    },
);
