import { create, unitDependencies } from 'mathjs';

import type { UnitLength } from '@/types/units';

export const useLengthConversion = (
  value: number,
  from: UnitLength,
  to: UnitLength
) => {
  const MATE = create({ unitDependencies }, {});

  const length = MATE.unit(value, from).to(to);

  return length.toNumber();
};
