import { Laboratory } from '@/types/enums';
import type { Item } from '@/types/item';

const itemValidator = {
  name: (v: string) => v.length > 3,
  description: (v: string, min: number = 3) => v.length > min,
  laboratory: (v: string) => v in Laboratory,
  quantity: (v: string, done: boolean = false) => v.length > 0,
};

export const validateItem = (item: Item) => {
  return {};
};

const rules = {
  minChar: (v: string, num = 3) => v.length >= num,
  isLaboratory: (v: Laboratory) => v in Laboratory,
};

itemValidator.name('a');
