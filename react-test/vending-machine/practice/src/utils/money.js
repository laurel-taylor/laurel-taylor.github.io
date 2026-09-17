import DENOMINATIONS from "../data/denominations"

export function formatCents(cents) {
  return `$${(cents / 100).toFixed(2)}`
}

function getCoins(cents) {
  const coins = {};

  for(let denom of DENOMINATIONS) {
    while(cents >= denom.cents) {
      if (!coins[denom.label]) {
        coins[denom.label] = 0;
      }
      coins[denom.label]++;
      cents -= denom.cents;
    }
  }

  return coins;
}

export function coinString(balance) {
  const coins = getCoins(balance);
  let strings = [];

  Object.entries(coins).forEach(([label, count]) => {
    strings.push(`${count} ${label}${count > 1 ? 's' : ''}`);
  });
  return strings.join(', ');
}
