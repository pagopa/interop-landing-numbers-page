const numFormatter = new Intl.NumberFormat('it-IT')

export function formatThousands(num: number) {
  return numFormatter.format(num)
}

export function formatThousandsForMobile(value: number) {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function toFormattedLongDate(ddmmyyyyDateString: string) {
  const formatDateForDateConstructor = ddmmyyyyDateString.split('/').reverse().join('-')
  const date = new Date(formatDateForDateConstructor)
  return toFormattedDate(date)
}

export function toFormattedDate(date: Date) {
  return date.toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function toFormattedNumericDate(date: Date) {
  return date.toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}
