/**
 * Takes a cash amount in parameter and
 * tries to compute an optimal distribution of coin values that sums up to 'cash' amount.
 * (optimal : minimum overall amount of coins used to make change)
 * @param {Number} cash The amount of cash to change (positive integer)
 * @return {Object | null}  If no solution is found, returns null.
 * If a solution is found, returns an object with the following shape :
 * {"2": <amountOf2Coins>, "5": <amountOf5Coins>, "10": <amountof10Coins>}
 */
module.exports.makeChange = function makeChange(cash) {
  let amount = cash;
  const change = {
    2: 0,
    5: 0,
    10: 0,
  };

  change['10'] = Math.floor(amount / 10);
  amount -= change['10'] * 10;
  if (change['10'] !== 0 && [1, 3].includes(amount)) {
    amount += 10;
    change['10'] -= 1;
  }

  change['5'] = Math.floor(amount / 5);
  amount -= change['5'] * 5;
  if (change['5'] !== 0 && [1, 3].includes(amount)) {
    amount += 5;
    change['5'] -= 1;
  }

  change['2'] = Math.floor(amount / 2);
  amount -= change['2'] * 2;

  return amount === 0 ? change : null;
};

/*
Recursive version, memoized for performance.
It can deal with undetermined coin values, but complexity is exponential...

module.exports.makeChange = function makeChange(cash, coins = [2, 5, 10]) {
  const cache = {};
  function toCoinArray(amount) {
    if (amount === 0) return [];
    if (cache[amount]) return cache[amount].slice();
    let min = [];
    let newMin;
    let newAmount;
    coins.forEach((coin) => {
      newAmount = amount - coin;
      if (newAmount >= 0) {
        newMin = toCoinArray(newAmount);
        if (
          (newMin.length < min.length - 1 || min.length === 0) &&
          (newMin.length !== 0 || newAmount === 0)
        ) {
          min = [coin].concat(newMin);
        }
      }
    });
    cache[amount] = min;
    return min.slice();
  }
  const individualCoins = toCoinArray(cash);
  if (individualCoins.length === 0) return null;
  const toReturn = {};
  coins.forEach((coin) => {
    toReturn[coin] = 0;
  });
  individualCoins.forEach((coin) => {
    toReturn[coin] += 1;
  });
  return toReturn;
};
*/
