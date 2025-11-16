import React from 'react'
import { getLocalizedValue } from '@/utils/common.utils'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

type ProviderSelectInputProps = {
  options: Array<string>
  counters: Record<string, number>
  value: string
  onChange: (provider: string) => void
}

export const ProviderSelectInput: React.FC<ProviderSelectInputProps> = ({
  options,
  counters,
  value,
  onChange,
}) => {
  const labelId = React.useId()
  const selectId = React.useId()

  const noElementsLabel = getLocalizedValue({ it: 'Nessun elemento presente', en: 'No elements' })

  return (
    <FormControl fullWidth sx={{ maxWidth: { md: 320 } }} size="small">
      <InputLabel
        sx={{
          transform: 'none',
          position: 'static',
          mb: 1,
          fontSize: 16,
          fontWeight: 400,
          color: 'text.primary',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'block',
        }}
        id={labelId}
      >
        {getLocalizedValue({ it: 'Ente erogatore', en: 'provider' })}
      </InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        labelId={labelId}
        id={selectId}
        sx={{}}
        displayEmpty
        disabled={options.length == 0}
        SelectDisplayProps={{
          style: {
            display: 'inline-block',
          },
        }}
        renderValue={(value) => {
          // if options is empty, display "No elements" label
          if (options.length == 0) {
            return <em>{noElementsLabel}</em>
          }
          return `${value} — ${counters[value]} connessioni`
        }}
        MenuProps={{ sx: { maxHeight: 340 } }}
      >
        {options.length <= 0 && (
          <MenuItem disabled value="">
            <em>{noElementsLabel}</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem value={option} key={option}>
            {option} — {counters[option]} connessioni
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
