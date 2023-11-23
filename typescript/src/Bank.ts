import {Currency} from './Currency'
import {MissingExchangeRateError} from './MissingExchangeRateError'
import { Money } from './Money'

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()
  private readonly _pivot: Currency

  constructor(pivot: Currency) {
    if (pivot == null) { throw new Error('Missing pivot currency') }
    this._pivot = pivot
  }

  /**
   * @param from
   * @param to
   * @param rate
   * @return {Bank}
   */
  static withExchangeRate (from: Currency, to: Currency, rate: number): Bank {
    const bank : Bank = new Bank(from)
    bank.addExchangeRate(from, to, rate)
    return bank
  }

  /**
   * @param from
   * @param to
   * @param rate
   */
  addExchangeRate (from: Currency, to: Currency, rate: number): void {
    if (from != this._pivot && to != this._pivot) { 
      throw new Error('Cannot add exchange rate for non-pivot currency') 
    }
    else if (from == to) { 
      this._exchangeRates.set(from + '->' + to, 1.0)
    }
    else{
      this._exchangeRates.set(from + '->' + to, rate)
    }
  }



  /**
   * @param amount
   * @param from
   * @param to
   * @return {number}
   */
  convert (amount: number, from: Currency, to: Currency, money1 : Money = Money.create(amount, from)): number {
    const money: Money = money1
    return this.ConvertMoney(money, to).amount
  }

  ConvertMoney(money: Money, to: Currency): Money {
    if (!this.canConvert(money,to)) { throw new MissingExchangeRateError(money.currency, to) }
    console.log(typeof(this._exchangeRates.get(this.getExchangeRateName(money.currency,this._pivot))))
    return money.hasCurrency(to)
        ? money
        : money.convert(this._exchangeRates.get(this.getExchangeRateName(money.currency,this._pivot)),this._pivot).convert(this._exchangeRates.get(this.getExchangeRateName(this._pivot,to)),to)
  }


  getExchangeRateName(from : Currency, to: Currency): string {
    return from + '->' + to
  }
  
  /**
   * @param from
   * @param to
   * @private
   * @return {boolean}
   */
  public canConvert(money: Money, to: Currency): boolean {
    return money.hasCurrency(to) || this._exchangeRates.has(this.getExchangeRateName(money.currency,to))
  }
}
