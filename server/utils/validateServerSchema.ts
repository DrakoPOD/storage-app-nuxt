import { bodySchema } from '../../schemas/schemas';
import Ajv from 'ajv/dist/2020';

export const validateBody = (body: Object) => {
  const validator = new Ajv().compile(bodySchema);

  return validator(body);
};
