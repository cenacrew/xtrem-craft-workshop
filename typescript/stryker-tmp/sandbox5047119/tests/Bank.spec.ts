import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'

describe('Bank', function () {

  test('convert from eur to usd returns number', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    
    const actual = bank.convert(10, Currency.EUR, Currency.USD)
    
    expect(actual).toBe(12)
  })

  test('convert from usd to usd returns same value', () => {
    const bank = Bank.withExchangeRate(Currency.USD, Currency.USD, 1.0)
    
    const actual = bank.convert(10, Currency.USD, Currency.USD)
    
    expect(actual).toBe(10)
  })

  test('convert throws error in case of missing exchange rates', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    
    const actual = bank.convert(10, Currency.EUR, Currency.KRW)
    
    expect(actual).toThrow(MissingExchangeRateError)
  })

  test('convert with different exchange rates returns different numbers', () => {
    
    // 1
    
    let bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    
    const actual1 = bank.convert(10, Currency.EUR, Currency.USD)
    bank.addExchangeRate(Currency.EUR, Currency.USD, 1.3)
  
    const actual2 = bank.convert(10, Currency.EUR, Currency.USD)
    
    expect(actual2).not.toBe(actual1)


  })
})
  