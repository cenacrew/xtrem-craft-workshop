import {Currency} from './Currency'
import { Bank } from './Bank'
import { Money } from './Money'


export class Portfolio {
    private values : Array<Money> = new Array()

    add(money : Money) {
        this.values.push(money);
    }

    evaluate(currency: Currency, bank: Bank): number {  
        let result: Money = Money.create(0, currency)
        this.values.forEach((value : Money) => result = result.add(bank.ConvertMoney(value, currency)))
        return result.amount
    }
    
}