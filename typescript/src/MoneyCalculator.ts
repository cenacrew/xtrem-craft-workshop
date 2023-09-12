import { Currency } from './Currency'

export class MoneyCalculator {
  static add = (amount: number, value: number): number => amount + value
  static times = (amount: number, value: number): number => amount * value
  static divide = (amount: number, value: number): number => amount / value
}
