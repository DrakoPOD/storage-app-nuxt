import { Units, UnitType } from '../utils/unitsEnums';

export type EnumUnitType = (typeof UnitType)[keyof typeof UnitType];

export type UnitTypesNames = keyof typeof Units;

type UnitLength = (typeof Units.length)[number];
export type LengthConversion = {
  [key in UnitLength]: number;
};

type UnitMass = (typeof Units.mass)[number];
export type MassConversion = {
  [key in UnitMass]: number;
};

type UnitVolume = (typeof Units.volume)[number];
export type VolumeConversion = {
  [key in UnitVolume]: number;
};

type UnitTemperature = (typeof Units.temperature)[number];
export type TemperatureConversion = {
  [key in UnitTemperature]: number;
};

type UnitPressure = (typeof Units.pressure)[number];
export type PressureConversion = {
  [key in UnitPressure]: number;
};

export type AllUnits =
  | UnitLength
  | UnitMass
  | UnitVolume
  | UnitTemperature
  | UnitPressure
  | 'unit';

//as
