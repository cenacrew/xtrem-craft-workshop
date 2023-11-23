import { Currency } from '../src/Currency'
import { Portfolio } from '../src/Portfolio'
import { Money } from '../src/Money'
import { BankBuilder } from '../src/BankBuilder'

describe('Portfolio', function () {
    test('Portfolio is empty and should return 0', ()=>{
        const portfolio = new Portfolio()
        const bank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).withExchangeRate(Currency.USD, 1.2).build()
        const amount = portfolio.evaluate(Currency.EUR, bank)
        expect(amount).toBe(0)
    })

    test('Value of the portfolio in the same currency ', ()=>{
        const portfolio = new Portfolio()
        const bank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).withExchangeRate(Currency.USD, 1.2).build()
        portfolio.add(Money.create(10,Currency.EUR))
        const amount = portfolio.evaluate(Currency.EUR, bank)
        expect(amount).toBe(10)
    })

    test('Value of the portfolio with multiple currency', ()=>{
        const portfolio = new Portfolio()
        const bank = BankBuilder.aBank().withPivotCurrency(Currency.USD).withExchangeRate(Currency.EUR, 0.82).build()
        portfolio.add(Money.create(10,Currency.EUR))
        portfolio.add(Money.create(5,Currency.USD))
        const amount = portfolio.evaluate(Currency.EUR, bank)
        expect(amount).toBe(14.1)
    })

    test('Value of the portfolio with multiple currency and two time the same currency', ()=>{
        const portfolio = new Portfolio()
        const bank = BankBuilder.aBank().withPivotCurrency(Currency.USD).withExchangeRate(Currency.EUR, 0.82).build()
        portfolio.add(Money.create(10,Currency.EUR))
        portfolio.add(Money.create(20,Currency.EUR))
        portfolio.add(Money.create(5,Currency.USD))
        const amount = portfolio.evaluate(Currency.EUR, bank)
        expect(amount).toBe(34.1)
    })
})