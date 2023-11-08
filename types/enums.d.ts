import { Laboratories } from '../utils/enumsObjects';

export type EnumLaboratoryType =
  (typeof Laboratories)[keyof typeof Laboratories];
