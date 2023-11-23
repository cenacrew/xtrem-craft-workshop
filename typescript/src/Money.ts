import { Currency } from "./Currency";

export class Money {
    

    amount: number;
    currency: Currency;

    private constructor(amount: number, currency: Currency) {
        this.amount = amount;
        this.currency = currency;
    }

    static create (amount: number, currency: Currency): Money {
        if (amount < 0) {
            throw new Error("Cannot create negative amount");
        }
        return new Money(amount, currency);
    }

    convert(exchangeRates: number, to: Currency): Money {
        return Money.create(this.amount * exchangeRates, to);
      }

    add (money: Money): Money {
        if (this.currency !== money.currency) {
            throw new Error("Currency mismatch");
        }
        if (money.amount < 0) {
            throw new Error("Cannot add negative amount");
        }
        return new Money(this.amount + money.amount, this.currency);
    }

    times (amount: number): Money {
        if (amount < 0) {
            throw new Error("Cannot multiply by negative amount");
        }
        return new Money(this.amount * amount, this.currency);
    }

    divide (money: Money): Money {
        if (this.currency !== money.currency) {
            throw new Error("Currency mismatch");
        }
        if (money.amount === 0) {
            throw new Error("Cannot divide by zero");
        }
        return new Money(this.amount / money.amount, this.currency);
    }

    hasCurrency(to: Currency) {
        return this.currency === to;
      }
}