import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { Portfolio } from '../src/Portfolio'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'
import { Money } from '../src/Money'

describe('Portfolio', function () {
    test('Portfolio is empty and should return 0', ()=>{
        const portfolio = new Portfolio()
        const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        const amount = portfolio.evaluate(Currency.EUR, bank)
        expect(amount).toBe(0)
    })

    test('Value of the portfolio in the same currency ', ()=>{
        const portfolio = new Portfolio()
        const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
        portfolio.add(Money.create(10,Currency.EUR))
        const amount = portfolio.evaluate(Currency.EUR, bank)
        expect(amount).toBe(10)
    })

    test('Value of the portfolio with multiple currency', ()=>{
        const portfolio = new Portfolio()
        const bank = Bank.withExchangeRate(Currency.USD, Currency.EUR, 0.82)
        portfolio.add(Money.create(10,Currency.EUR))
        portfolio.add(Money.create(5,Currency.USD))
        const amount = portfolio.evaluate(Currency.EUR, bank)
        expect(amount).toBe(14.1)
    })

    test('Value of the portfolio with multiple currency and two time the same currency', ()=>{
        const portfolio = new Portfolio()
        const bank = Bank.withExchangeRate(Currency.USD, Currency.EUR, 0.82)
        portfolio.add(Money.create(10,Currency.EUR))
        portfolio.add(Money.create(20,Currency.EUR))
        portfolio.add(Money.create(5,Currency.USD)) 
        const amount = portfolio.evaluate(Currency.EUR, bank)
        expect(amount).toBe(34.1)
    })
})