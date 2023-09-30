import Ajv from 'ajv/dist/2020';
import addFormats from 'ajv-formats';

import { itemSchema, manufacturerSchema } from '../schemas/schemas';

export const useValidateItem = (data: Object) => {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const validate = ajv.compile(itemSchema);
  const valid = validate(data);

  return { valid, errors: validate.errors };
};

export const useValidateManufacturer = (data: Object) => {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(manufacturerSchema);
  const valid = validate(data);
  if (!valid) {
    console.log(validate.errors);
  }
  return { valid, errors: JSON.stringify(validate.errors) };
};
