// @ts-nocheck
function stryNS_9fa48() {
  var g = new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { Currency } from './Currency';
import { MissingExchangeRateError } from './MissingExchangeRateError';
export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map();

  /**
   * @param from
   * @param to
   * @param rate
   * @return {Bank}
   */
  static withExchangeRate(from: Currency, to: Currency, rate: number): Bank {
    if (stryMutAct_9fa48("0")) {
      {}
    } else {
      stryCov_9fa48("0");
      const bank = new Bank();
      bank.addExchangeRate(from, to, rate);
      return bank;
    }
  }

  /**
   * @param from
   * @param to
   * @param rate
   */
  addExchangeRate(from: Currency, to: Currency, rate: number): void {
    if (stryMutAct_9fa48("1")) {
      {}
    } else {
      stryCov_9fa48("1");
      this._exchangeRates.set(from + (stryMutAct_9fa48("2") ? "" : (stryCov_9fa48("2"), '->')) + to, rate);
    }
  }

  /**
   * @param amount
   * @param from
   * @param to
   * @return {number}
   */
  convert(amount: number, from: Currency, to: Currency): number {
    if (stryMutAct_9fa48("3")) {
      {}
    } else {
      stryCov_9fa48("3");
      if (stryMutAct_9fa48("6") ? false : stryMutAct_9fa48("5") ? true : stryMutAct_9fa48("4") ? this.canConvert(from, to) : (stryCov_9fa48("4", "5", "6"), !this.canConvert(from, to))) {
        if (stryMutAct_9fa48("7")) {
          {}
        } else {
          stryCov_9fa48("7");
          throw new MissingExchangeRateError(from, to);
        }
      }
      return (stryMutAct_9fa48("10") ? from !== to : stryMutAct_9fa48("9") ? false : stryMutAct_9fa48("8") ? true : (stryCov_9fa48("8", "9", "10"), from === to)) ? amount : stryMutAct_9fa48("11") ? amount / this._exchangeRates.get(from + '->' + to) : (stryCov_9fa48("11"), amount * this._exchangeRates.get(from + (stryMutAct_9fa48("12") ? "" : (stryCov_9fa48("12"), '->')) + to));
    }
  }

  /**
   * @param from
   * @param to
   * @private
   * @return {boolean}
   */
  private canConvert(from: Currency, to: Currency): boolean {
    if (stryMutAct_9fa48("13")) {
      {}
    } else {
      stryCov_9fa48("13");
      return stryMutAct_9fa48("16") ? from === to && this._exchangeRates.has(from + '->' + to) : stryMutAct_9fa48("15") ? false : stryMutAct_9fa48("14") ? true : (stryCov_9fa48("14", "15", "16"), (stryMutAct_9fa48("18") ? from !== to : stryMutAct_9fa48("17") ? false : (stryCov_9fa48("17", "18"), from === to)) || this._exchangeRates.has(from + (stryMutAct_9fa48("19") ? "" : (stryCov_9fa48("19"), '->')) + to));
    }
  }
}