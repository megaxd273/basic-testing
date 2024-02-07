import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 1000, b: 2312, action: Action.Add })).toBe(
      3312,
    );
    expect(simpleCalculator({ a: -1, b: 30, action: Action.Add })).toBe(29);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: 10, b: -20, action: Action.Subtract })).toBe(
      30,
    );
    expect(simpleCalculator({ a: -10, b: -20, action: Action.Subtract })).toBe(
      10,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Multiply })).toBe(6);
    expect(simpleCalculator({ a: 12, b: -2, action: Action.Multiply })).toBe(
      -24,
    );
    expect(simpleCalculator({ a: -8, b: -3, action: Action.Multiply })).toBe(
      24,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Divide })).toBe(2);
    expect(simpleCalculator({ a: -12, b: 2, action: Action.Divide })).toBe(-6);
    expect(simpleCalculator({ a: -4, b: -2, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate })).toBe(
      9,
    );
    expect(
      simpleCalculator({ a: -2, b: 10, action: Action.Exponentiate }),
    ).toBe(1024);
    expect(simpleCalculator({ a: 2, b: -2, action: Action.Exponentiate })).toBe(
      0.25,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: 'substract' })).toBe(null);
    expect(simpleCalculator({ a: 3, b: 2, action: '//' })).toBe(null);
    expect(simpleCalculator({ a: 3, b: 2, action: 24 })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '3', b: 2, action: Action.Multiply })).toBe(
      null,
    );
    expect(
      simpleCalculator({ a: true, b: false, action: Action.Multiply }),
    ).toBe(null);
    expect(
      simpleCalculator({ a: [], b: new Date(), action: Action.Multiply }),
    ).toBe(null);
  });
});
