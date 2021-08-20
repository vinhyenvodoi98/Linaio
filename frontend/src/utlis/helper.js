export function parseBalance(_balanceMutez, _decimals) {
  if (!_balanceMutez) {
    return 0;
  }
  if (!_decimals) {
    _decimals = 6;
  }
  _decimals = parseInt(_decimals);
  let afterDecimal;
  const tezString = _balanceMutez.toString();
  const trailingZeros = /0+$/u;

  const beforeDecimal =
    tezString.length > _decimals ? tezString.slice(0, tezString.length - _decimals) : '0';
  afterDecimal = ('0'.repeat(_decimals) + _balanceMutez)
    .slice(-_decimals)
    .replace(trailingZeros, '');
  if (afterDecimal === '') {
    afterDecimal = '0';
  } else if (afterDecimal.length > 3) {
    afterDecimal = afterDecimal.slice(0, 3);
  }
  return parseFloat(`${beforeDecimal}.${afterDecimal}`);
}
