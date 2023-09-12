import {Currency} from './Currency'
import {MissingExchangeRateError} from './MissingExchangeRateError'

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()

  /**
   * @param from
   * @param to
   * @param rate
   * @return {Bank}
   */
  static withExchangeRate (from: Currency, to: Currency, rate: number): Bank {
    const bank = new Bank()
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
  convert (amount: number, from: Currency, to: Currency): number {
    if (!(this.canConvert(from, to))) { throw new MissingExchangeRateError(from, to) }

    return from === to
        ? amount
        : amount * this._exchangeRates.get(from + '->' + to)
  }
  

  /**
   * @param from
   * @param to
   * @private
   * @return {boolean}
   */
  private canConvert(from: Currency, to: Currency): boolean {
    return from === to || this._exchangeRates.has(from + '->' + to)
  }
}
