import type { EnumLaboratoryType } from '@/types/enums';

export const Laboratories = {
  BIOLOGY: 1,
  CHEMISTRY: 2,
  PHYSICS: 3,
  MATHEMATICS: 4,
  ROBOTICS: 5,
} as const;

export const LaboratoriesNames: {
  readonly [key in EnumLaboratoryType]: string;
} = {
  1: 'Biología',
  2: 'Química',
  3: 'Física',
  4: 'Matemáticas',
  5: 'Robótica',
} as const;

export const LabList = Object.values(Laboratories).map((key) => {
  return {
    name: LaboratoriesNames[key],
    value: key,
  };
});

export const EnumsLaboratory = <const>[...Object.values(Laboratories)];
