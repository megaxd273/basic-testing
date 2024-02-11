import lodash from 'lodash';
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const acc = getBankAccount(1000);
const acc2 = getBankAccount(1000);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(acc).toBeInstanceOf(BankAccount);
    expect(acc.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => acc.withdraw(2000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => acc.transfer(1500, acc2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => acc.transfer(1000, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(acc.deposit(1000).getBalance()).toBe(2000);
  });

  test('should withdraw money', () => {
    expect(acc.withdraw(1000).getBalance()).toBe(1000);
  });

  test('should transfer money', () => {
    expect(acc.transfer(1000, acc2).getBalance()).toBe(0);
    expect(acc2.getBalance()).toBe(2000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    expect(typeof (await acc.fetchBalance())).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(0);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
