import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timer = jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    doStuffByTimeout(cb, 1000);
    expect(timer).toBeCalledWith(cb, 1000);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 1000);
    expect(cb).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const timer = jest.spyOn(global, 'setInterval');
    const cb = jest.fn();
    doStuffByInterval(cb, 1000);
    expect(timer).toBeCalledWith(cb, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 1000);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalled();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('qwe.txt');
    expect(joinSpy).toBeCalledWith(__dirname, 'qwe.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await expect(readFileAsynchronously('qwe.txt')).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue('data');
    await expect(readFileAsynchronously('qwe.txt')).resolves.toBe('data');
  });
});
