import { Currency } from '../src/Currency'
import { MoneyCalculator } from '../src/MoneyCalculator'
import { Money } from '../src/Money'

describe('Money', function () {
  test('add returns number', () => {

    // 1

    let actual = MoneyCalculator.add(5, 10)
    
    expect(actual).toBeNumber()

    // 2

    actual = MoneyCalculator.add(5, 10)

    expect(actual).not.toBeNull()
  })

  test('multiply returns positive number', () => {
    const actual = MoneyCalculator.times(10, 2)
    
    expect(actual).toBeGreaterThan(0)
  })

  test('divide returns number', () => {
    const actual = MoneyCalculator.divide(4002, 4)
    
    expect(actual).toBe(1000.5)
  })
})

describe('Money', function () {
  test('should add moneys', () => {
    const money = new Money(5, Currency.USD);
    const sum = money.add(new Money(10, Currency.USD));

    expect(sum).toEqual(new Money(15, Currency.USD));
  })
})
