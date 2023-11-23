import {Currency} from './Currency'
import {MissingExchangeRateError} from './MissingExchangeRateError'
import { Money } from './Money'

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()

  /**
   * @param from
   * @param to
   * @param rate
   * @return {Bank}
   */
  static withExchangeRate (from: Currency, to: Currency, rate: number): Bank {
    const bank : Bank = new Bank()
    bank.addExchangeRate(from, to, rate)
    return bank
  }

  /**
   * @param from
   * @param to
   * @param rate
   */
  addExchangeRate (from: Currency, to: Currency, rate: number): void {
    this._exchangeRates.set(from + '->' + to, rate)
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

    return money.hasCurrency(to)
        ? money
        : money.convert(this._exchangeRates.get(this.getExchangeRate(money, to)),to) 
  }

  getExchangeRate(money: Money, to: Currency): string {
    return money.currency + '->' + to
  }
  
  /**
   * @param from
   * @param to
   * @private
   * @return {boolean}
   */
  public canConvert(money: Money, to: Currency): boolean {
    return money.hasCurrency(to) || this._exchangeRates.has(this.getExchangeRate(money,to))
  }
}
