import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 10, b: -20, action: Action.Subtract, expected: 30 },
  { a: -10, b: -20, action: Action.Subtract, expected: 10 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 12, b: -2, action: Action.Multiply, expected: -24 },
  { a: -8, b: -3, action: Action.Multiply, expected: 24 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: -12, b: 2, action: Action.Divide, expected: -6 },
  { a: -4, b: -2, action: Action.Divide, expected: 2 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: -2, b: 10, action: Action.Exponentiate, expected: 1024 },
  { a: 2, b: -2, action: Action.Exponentiate, expected: 0.25 },
  { a: 3, b: 2, action: 'substract', expected: null },
  { a: 3, b: 2, action: '//', expected: null },
  { a: 3, b: 2, action: 24, expected: null },
  { a: '3', b: 2, action: Action.Add, expected: null },
  { a: true, b: false, action: Action.Add, expected: null },
  { a: [], b: new Date(), action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test('should blah-blah', () => {
    expect(true).toBe(true);
  });
  test.each(testCases)('Test case #%#: %s', (testCase) => {
    expect(
      simpleCalculator({
        a: testCase.a,
        b: testCase.b,
        action: testCase.action,
      }),
    ).toBe(testCase.expected);
  });
});
