import { macroCategoriesOptionsSorted } from '@/configs/constants.config'
import { MacroCategory } from '@/models/numbers.models'
import { getLocalizedValue } from '@/utils/common.utils'
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import React from 'react'

type MacroCategoryMultipleSelectInputProps<T extends string[] | undefined> = {
  onChange: (value: T) => void
  values: T
}

export function MacroCategoryMultipleSelectInput<T extends string[] | undefined>({
  values,
  onChange,
}: MacroCategoryMultipleSelectInputProps<T>) {
  const options = macroCategoriesOptionsSorted.filter((opt) => opt.label !== 'Tutte')

  const labelId = React.useId()
  const selectId = React.useId()

  const renderValue = (selected: Array<MacroCategory['id']>) => {
    const result = options
      .filter((opt) => selected.includes(opt.value))
      .map((sel) => sel.label)
      .join(', ')

    return (
      <Box
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {result}
      </Box>
    )
  }

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
        {getLocalizedValue({ it: 'Categoria ente erogatore', en: 'Provider category' })}
      </InputLabel>{' '}
      <Select
        labelId={labelId}
        id={selectId}
        multiple
        // @ts-ignore-next-line
        value={values as string}
        onChange={(e) => onChange(e.target.value as T)}
        input={<OutlinedInput label="" />}
        renderValue={renderValue}
        MenuProps={{ sx: { maxHeight: 340 } }}
      >
        {options.map((opt) => (
          <MenuItem value={opt.value} key={opt.label}>
            <Checkbox checked={values?.includes(opt.value)} />
            <ListItemText primary={opt.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
