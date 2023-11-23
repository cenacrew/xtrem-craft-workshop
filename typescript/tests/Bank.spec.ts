import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'
import { Money } from '../src/Money'

describe('Bank', function () {

  test('convert from eur to usd returns number', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    
    const money = Money.create(10, Currency.EUR)

    const actual = bank.ConvertMoney(money, Currency.USD)
    
    expect(actual.amount).toBe(12)
  })

  test('convert from usd to usd returns same value', () => {
    const bank = Bank.withExchangeRate(Currency.USD, Currency.USD, 1.0)

    const money = Money.create(10, Currency.USD)
    
    const actual = bank.ConvertMoney(money, Currency.USD)
    
    expect(actual.amount).toBe(10)
  })

  test('convert throws error in case of missing exchange rates', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    
    const money = Money.create(10, Currency.EUR)

    const actual = () => bank.ConvertMoney(money, Currency.KRW)
    
    expect(actual).toThrow(MissingExchangeRateError)
  })

  test('convert with different exchange rates returns different numbers', () => {
    
    // 1
    
    let bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)

    const money1 = Money.create(10, Currency.EUR)
    const actual1 = bank.ConvertMoney(money1,Currency.USD)
    bank.addExchangeRate(Currency.EUR, Currency.USD, 1.3)

    const money2 = Money.create(10, Currency.EUR)
    const actual2 = bank.ConvertMoney(money2, Currency.USD)
    expect(actual2.amount).not.toBe(actual1.amount)


  })
})
  