import {
  bodySchema,
  queryUserSchema,
  bodyNewUserSchema,
  itemSchema,
  manufacturerSchema,
  bodyLaboratorySchema,
} from '../../schemas/schemas';
import Ajv from 'ajv/dist/2020';

export const validateBody = (body: Object) => {
  const validator = new Ajv().compile(bodySchema);

  return validator(body);
};

export const validateQueryUser = (query: Object) => {
  const validator = new Ajv().compile(queryUserSchema);

  return validator(query);
};

export const validateNewUser = (body: Object) => {
  const validator = new Ajv().compile(bodyNewUserSchema);

  return validator(body);
};

export const validateItem = (item: Object) => {
  const validator = new Ajv().compile(itemSchema);

  return validator(item);
};

export const validateManufacturer = (manufacturer: Object) => {
  const validator = new Ajv().compile(manufacturerSchema);

  return validator(manufacturer);
};

export const validateBodyLaboratory = (body: Object) => {
  const validator = new Ajv({ useDefaults: true, allErrors: true }).compile(
    bodyLaboratorySchema
  );

  const validBody = validator(body);
  const errorBody = validator.errors;
  return { validBody, errorBody };
};
