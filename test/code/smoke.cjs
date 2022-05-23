const test = require('tape');
const path = require('path');
const fse = require('fs-extra');
const ProskommaJsonValidator = require('../../src').default;

const testGroup = 'Smoke';

test(
    `Hello (${testGroup})`,
    async function (t) {
        try {
            t.plan(2);
            const validator = new ProskommaJsonValidator();
            t.throws(()=> validator.validate('banana', {}), 'Unknown');
            t.notOk(validator.validate('perf', {}));
        } catch (err) {
            console.log(err);
        }
    },
);
