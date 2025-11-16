import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

type SelectInputProps<T extends string | number | readonly string[] | undefined> = {
  label: string
  onChange: (value: T) => void
  value: T
  options: Array<{ label: string; value: T }>
}

export function SelectInput<T extends string | number | readonly string[] | undefined>({
  label,
  options,
  value,
  onChange,
}: SelectInputProps<T>) {
  const labelId = React.useId()
  const selectId = React.useId()

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
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        labelId={labelId}
        id={selectId}
        sx={{}}
        SelectDisplayProps={{
          style: {
            display: 'inline-block',
          },
        }}
        MenuProps={{ sx: { maxHeight: 340 } }}
      >
        {options.map(({ label, value }) => (
          <MenuItem value={value} key={label}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
