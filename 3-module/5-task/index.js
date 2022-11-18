function getMinMax(str) {
  let num = str.split(' ');
  let numFilter = num
  .filter((str) => isFinite(str))
  let min = Math.min(...numFilter);
  let max = Math.max(...numFilter);
  return { min: min, max: max };
}
