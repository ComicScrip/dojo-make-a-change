/**
 * Takes a cash amount in parameter and
 * tries to compute an optimal distribution of coin values that sums up to 'cash' amounnt.
 * (optimal : minimum overall amount of coins used to make change) *
 * @param {Number} cash The amount of cash to change (positive integer)
 * @return {Object | null}  * If no solution is found, returns null.
 * If a solution is found, returns an object with the following shape :
 * {"2": <amountOf2Coins>, "5": <amountOf5Coins>, "10": <amountof10Coins>}
 */
export function makeChange2(amount) {
  const change = {
    "2": 0,
    "5": 0,
    "10": 0
  };

  change["10"] = Math.floor(amount / 10);
  amount -= change["10"] * 10;
  if (change["10"] !== 0 && [1, 3].includes(amount)) {
    amount += 10;
    change["10"] -= 1;
  }

  change["5"] = Math.floor(amount / 5);
  amount -= change["5"] * 5;
  if (change["5"] !== 0 && [1, 3].includes(amount)) {
    amount += 5;
    change["5"] -= 1;
  }

  change["2"] = Math.floor(amount / 2);
  amount -= change["2"] * 2;

  return amount === 0 ? change : null;
}

/*
Recursive version, memoized for performance.
It can deal with undetermined coin values, but complexity is exponential...
*/
export function makeChange(amount, coins = [2, 5, 10]) {
  const cache = {};
  function toCoinArray(amount) {
    if (!amount) return [];
    if (cache[amount]) return cache[amount].slice(0);
    let min = [],
      newMin,
      newAmount;
    coins.forEach((coin) => {
      newAmount = amount - coin;
      if (newAmount >= 0) {
        newMin = toCoinArray(newAmount);
        if (
          (newMin.length < min.length - 1 || !min.length) &&
          (newMin.length || !newAmount)
        ) {
          min = [coin].concat(newMin);
        }
      }
    });
    cache[amount] = min;
    return min.slice(0);
  }
  const res = toCoinArray(amount);
  if (res.length === 0) return null;
  const resObj = { "2": 0, "5": 0, "10": 0 };
  res.forEach((coin) => resObj[coin]++);
  return resObj;
}
