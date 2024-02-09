import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue('value1')).resolves.toBe('value1');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('asd')).toThrowError(Error('asd'));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError(Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
