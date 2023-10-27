import { describe, test, expect } from 'vitest';

import { create, unitDependencies } from 'mathjs';

import { useUnits } from '../types/units.d';

const MATE = create({ unitDependencies }, {});

test('no-unit-exist', () => {
  expect(() => MATE.unit('asasas')).toThrow();
});

test('unit is number', () => {
  expect(MATE.unit(1, 'm').toNumber()).toBe(1);
});

describe('Unit Test Length', async () => {
  // await setup({});
  const meter = MATE.unit(1, 'm');
  test.each(useUnits.length)('length-unit %s', (unit) => {
    expect(() => meter.to(unit)).toBeDefined();
  });
});

describe('Unit Test Mass', async () => {
  const mass = MATE.unit(1, 'kg');
  test.each(useUnits.mass)('mass-unit %s', (unit) => {
    expect(() => mass.to(unit)).toBeDefined();
  });
});

describe('Unit Test Volume', async () => {
  const vol = MATE.unit(1, 'l');
  test.each(useUnits.volume)('volume-unit %s', (unit) => {
    expect(() => vol.to(unit)).toBeDefined();
  });
});

// MATE.createUnit({
//   '°C': '1 degC',
//   '°F': '1 degF',
// });

describe('Unit Test Temperature', async () => {
  test.each(useUnits.temperature)('temperature-unit %s', (unit) => {
    expect(MATE.unit(unit)).toBeDefined();
  });
});

describe('Unit Test Pressure', async () => {
  const pressure = MATE.unit(1, 'Pa');
  test.each(useUnits.pressure)('pressure-unit %s', (unit) => {
    expect(() => pressure.to(unit)).toBeDefined();
  });
});
