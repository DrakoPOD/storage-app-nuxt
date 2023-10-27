import type { TypeItemQuantity } from '@/types/item';

export const ItemTypes = {
  SENSOR: 'SEN',
  CHEMICAL: 'CHE',
  BIOLOGICAL: 'BIO',
  SAFETY: 'SAF',
  TOOL: 'TOL',
  ELECTRONICS: 'ELE',
  COMPUTER: 'COM',
  FURNITURE: 'FUR',
  OTHER: 'OTH',
  CLEANING: 'CLR',
  CONSUMABLE: 'CON',
} as const;

export const ItemStatus = {
  AVAILABLE: 'AVL',
  IN_USE: 'INU',
  BROKEN: 'BRK',
  LOST: 'LST',
  DISPOSED: 'DSP',
} as const;

export const ItemQuantityTypes: TypeItemQuantity = {
  SEN: <const>[{ title: 'Unidad', key: 'unit' }],
  CHE: <const>[
    { title: 'Unidad', key: 'unit' },
    { title: 'Masa', key: 'mass' },
    { title: 'Volumen', key: 'volume' },
  ],
  BIO: <const>[
    { title: 'Unidad', key: 'unit' },
    { title: 'Masa', key: 'mass' },
    { title: 'Volumen', key: 'volume' },
  ],
  SAF: <const>[{ title: 'Unidad', key: 'unit' }],
  TOL: <const>[{ title: 'Unidad', key: 'unit' }],
  ELE: <const>[{ title: 'Unidad', key: 'unit' }],
  COM: <const>[{ title: 'Unidad', key: 'unit' }],
  FUR: <const>[{ title: 'Unidad', key: 'unit' }],
  OTH: <const>[
    { title: 'Unidad', key: 'unit' },
    { title: 'Masa', key: 'mass' },
    { title: 'Volumen', key: 'volume' },
    { title: 'Longitud', key: 'length' },
  ],
  CLR: <const>[
    { title: 'Unidad', key: 'unit' },
    { title: 'Masa', key: 'mass' },
    { title: 'Volumen', key: 'volume' },
  ],
  CON: <const>[
    { title: 'Unidad', key: 'unit' },
    { title: 'Masa', key: 'mass' },
    { title: 'Volumen', key: 'volume' },
  ],
} as const;
