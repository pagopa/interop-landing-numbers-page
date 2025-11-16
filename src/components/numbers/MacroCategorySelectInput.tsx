import { macroCategoriesOptionsSorted } from '@/configs/constants.config'
import { MacroCategory } from '@/models/numbers.models'
import { getLocalizedValue } from '@/utils/common.utils'
import React from 'react'
import { SelectInput } from './SelectInput'

type MacroCategorySelectInputProps = {
  onChange: (value: MacroCategory['id']) => void
  value: MacroCategory['id']
}

export const MacroCategorySelectInput: React.FC<MacroCategorySelectInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <SelectInput
      label={getLocalizedValue({ it: 'Categoria ente fruitore', en: 'Consumer category' })}
      value={value}
      onChange={onChange}
      options={macroCategoriesOptionsSorted}
    />
  )
}
