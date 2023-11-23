import {Currency} from './Currency'
import { Bank } from './Bank'

export class BankBuilder {

    private pivot : Currency = Currency.USD;

    private to: Currency = Currency.USD;

    private exchangeRate: number = 1.0;


    public static aBank() : BankBuilder {
        return new BankBuilder()
    }

    public withPivotCurrency(currency: Currency) : BankBuilder {
        this.pivot = currency
        return this
    }

    public withExchangeRate(to: Currency, rate: number) : BankBuilder {
        this.to = to
        this.exchangeRate = rate
        return this
    }

    public build() : Bank {
        const bank : Bank = Bank.withExchangeRate(this.pivot, this.to, this.exchangeRate)
        bank.addExchangeRate(this.to, this.pivot,  1/this.exchangeRate)
        return bank
    }
}
