import { Timeframe } from '@/models/numbers.models'
import { getLocalizedValue } from '@/utils/common.utils'
import React from 'react'
import { SelectInput } from './SelectInput'

type TimeframeSelectInputProps = {
  onChange: (value: Timeframe) => void
  value: Timeframe
}

export const TimeframeSelectInput: React.FC<TimeframeSelectInputProps> = ({ value, onChange }) => {
  return (
    <SelectInput
      label={getLocalizedValue({ it: 'Periodo', en: 'Time range' })}
      value={value}
      onChange={onChange}
      options={[
        {
          value: 'lastSixMonths',
          label: getLocalizedValue({ it: 'Ultimi 6 mesi', en: 'Last 6 months' }),
        },
        {
          value: 'lastTwelveMonths',
          label: getLocalizedValue({ it: 'Ultimi 12 mesi', en: 'Last 12 months' }),
        },
        {
          value: 'fromTheBeginning',
          label: getLocalizedValue({
            it: 'Dall’inizio del servizio',
            en: 'From the start of the service',
          }),
        },
      ]}
    />
  )
}
