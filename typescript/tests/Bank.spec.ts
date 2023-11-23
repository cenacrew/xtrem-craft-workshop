import { Currency } from '../src/Currency'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'
import { Money } from '../src/Money'
import { BankBuilder } from '../src/BankBuilder'
import { Bank } from '../src/Bank'

describe('Bank', function () {

  test('convert from eur to usd returns number', () => {
    const bank2 = BankBuilder.aBank().withPivotCurrency(Currency.EUR)
    .withExchangeRate(Currency.USD, 1.2)
    .build()
    
    const money = Money.create(10, Currency.EUR)

    const actual = bank2.ConvertMoney(money, Currency.USD)
    
    expect(actual.amount).toBe(12)
  })

  test('convert from usd to usd returns same value', () => {
    const bank = BankBuilder.aBank()
    .withPivotCurrency(Currency.USD)
    .withExchangeRate(Currency.USD, 1.0)
    .build()

    const money = Money.create(10, Currency.USD)
    
    const actual = bank.ConvertMoney(money, Currency.USD)
    
    expect(actual.amount).toBe(10)
  })

  test('convert throws error in case of missing exchange rates', () => {
    const bank = BankBuilder.aBank()
    .withPivotCurrency(Currency.EUR)
    .withExchangeRate(Currency.USD, 1.2)
    .build()
    
    const money = Money.create(10, Currency.EUR)

    const actual = () => bank.ConvertMoney(money, Currency.KRW)
    
    expect(actual).toThrow(MissingExchangeRateError)
  })

  test('convert with different exchange rates returns different numbers', () => {
    
    // 1
    let bank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).withExchangeRate(Currency.USD, 1.2).build()

    const money1 = Money.create(10, Currency.EUR)
    const actual1 = bank.ConvertMoney(money1,Currency.USD)

    const money2 = Money.create(10, Currency.EUR)
    const actual2 = bank.ConvertMoney(money2, Currency.USD)
    expect(actual2.amount).not.toBe(actual1.amount)


  })

  test ('convert throws error in case of missing pivot currency', () => {
    const bank = BankBuilder.aBank()
    .withExchangeRate(Currency.USD, 1.2)
    .build()
    
    const money = Money.create(10, Currency.KRW)

    const actual = () => new Bank(null)
    
    expect(actual).toThrow("Missing pivot currency")
  })
})
  