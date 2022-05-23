# proskomma-json-validator
A JSON Schema Validator for Proskomma data

```
import ProskommaJsonValidator from 'proskomma-json-validator;
const validatorResult = validator.validate('perf', {});
/*
{
  schemaKey: 'perf',
  isValid: false,
  errors: [
    {
      instancePath: '',
      schemaPath: '#/required',
      keyword: 'required',
      params: [Object],
      message: "must have required property 'docSets'"
    }
  ]
}
*/
```
