import {Currency} from './Currency'
import { Bank } from './Bank'

export class Portfolio {
    private values : Map<Currency,number> = new Map()

    add(amount: number, currency: Currency) {
        if (this.values.has(currency)) {
            amount += this.values.get(currency)
        }
        this.values.set(currency,amount)
    }

    evaluate(currency: Currency, bank: Bank): number {
        let result: number = 0
        this.values.forEach((value : number, orignalCurrency : Currency) => result += bank.convert(value,orignalCurrency,currency))
        return result
    }
    


}