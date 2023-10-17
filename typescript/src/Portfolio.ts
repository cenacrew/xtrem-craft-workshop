import {Currency} from './Currency'
import { Bank } from './Bank'

export class Portfolio {
    private values : Map<Currency,number> = new Map()

    add(arg0: number, EUR: Currency) {
        this.values.set(EUR,arg0)
    }

    evaluate(currency: Currency, bank: Bank): number {
        const result = 0
        this.values.forEach(value => )
        return this.values.get(currency) ?? 0
    }
    


}