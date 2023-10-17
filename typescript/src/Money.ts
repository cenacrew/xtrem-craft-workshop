import { Currency } from "./Currency";

export class Money {
    amount: number;
    currency: Currency;

    constructor(amount: number, currency: Currency) {
        this.amount = amount;
        this.currency = currency;
    }

    add (money: Money): Money {
        if (this.currency !== money.currency) {
            throw new Error("Currency mismatch");
        }
        return new Money(this.amount + money.amount, this.currency);
    }
}
