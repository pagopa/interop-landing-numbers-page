export function getLocalizedValue<TValue>(option: Record<'it' | 'en', TValue>): TValue {
  if (typeof window !== 'undefined') {
    const activeLang = window.document.documentElement.lang
    if (activeLang === 'en') return option.en
  }

  return option.it
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function linearScale(domain: [number, number], range: [number, number]) {
  const domainLength = domain[1] - domain[0]
  const rangeLength = range[1] - range[0]
  return function (x: number) {
    return range[0] + ((x - domain[0]) / domainLength) * rangeLength
  }
}

/**
 * Calculate the simple moving average
 * @param {Array} items - The list of number.
 * @param {number} interval - The number of window to calculate.
 * @return {Array} The list of average value.
 */
export function calculateSimpleMovingAverage(
  items: Array<number>,
  interval: number
): Array<number | null> {
  let index = interval - 1
  const length = items.length + 1

  // the first "interval" elements are set to null because isn't possible calculate average over previous
  // 30 days (which are not present)
  const results: Array<number | null> = new Array(interval).fill(null)

  while (index < length) {
    index = index + 1
    const intervalSlice = items.slice(index - interval, index)
    const sum = intervalSlice.reduce((prev, curr) => prev + curr, 0)
    results.push(sum / interval)
  }

  return results
}

export function scale(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
