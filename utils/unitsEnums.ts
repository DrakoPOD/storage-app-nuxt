export const Units = {
  length: <const>['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi'],
  mass: <const>['mg', 'g', 'kg', 'oz', 'lb'],
  volume: <const>['ml', 'l', 'gal'],
  temperature: <const>['degC', 'degF', 'K'],
  pressure: <const>['Pa', 'kPa', 'MPa', 'GPa'],
  unit: <const>['unit'],
} as const;

export const UnitType = {
  UNIT: 0,
  LENGTH: 1,
  MASS: 2,
  VOLUME: 3,
  TEMPERATURE: 4,
  PRESSURE: 5,
} as const;

export const allUnitsArray = [...Object.values(Units).flat()];
