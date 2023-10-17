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
import { Bank } from './Bank';
export class Portfolio {
  private values: Map<Currency, number> = new Map();
  add(arg0: number, EUR: Currency) {
    if (stryMutAct_9fa48("28")) {
      {}
    } else {
      stryCov_9fa48("28");
      this.values.set(EUR, arg0);
    }
  }
  evaluate(currency: Currency, bank: Bank): number {
    if (stryMutAct_9fa48("29")) {
      {}
    } else {
      stryCov_9fa48("29");
      let result = 0;
      this.values.forEach(stryMutAct_9fa48("30") ? () => undefined : (stryCov_9fa48("30"), value => stryMutAct_9fa48("31") ? result -= bank.convert(value[1], currency, value[0]) : (stryCov_9fa48("31"), result += bank.convert(value[1], currency, value[0]))));
      return result;
    }
  }
}