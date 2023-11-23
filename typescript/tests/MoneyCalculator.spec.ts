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
    const money = Money.create(5, Currency.USD);
    const sum = money.add(Money.create(10, Currency.USD));

    expect(sum).toEqual(Money.create(15, Currency.USD));
  })

  test('should not add money when negative amount', () => {
    const money = Money.create(5, Currency.USD);
    const sum = () => money.add(Money.create(-10, Currency.USD));

    expect(sum).toThrowError("Cannot create negative amount");
  })

  test('should not add money when different currency', () => {
    const money = Money.create(5, Currency.USD);
    const sum = () => money.add(Money.create(10, Currency.EUR));

    expect(sum).toThrowError("Currency mismatch");
  })

  test('should multiply moneys', () => {
    const money = Money.create(5, Currency.USD);
    const sum = money.times(2);

    expect(sum).toEqual(Money.create(10, Currency.USD));
  })

  test('should divide moneys', () => {
    const money = Money.create(10, Currency.USD);
    const sum = money.divide(Money.create(2, Currency.USD));

    expect(sum).toEqual(Money.create(5, Currency.USD));
  })

  test('should not divide money when different currency', () => {
    const money = Money.create(5, Currency.USD);
    const sum = () => money.divide(Money.create(10, Currency.EUR));

    expect(sum).toThrowError("Currency mismatch");
  })
})
