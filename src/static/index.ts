import { Locale } from '../configs/constants.config'
import { itCommonData } from './data/common/it'
import { enCommonData } from './data/common/en'

export const getCommonData = (locale: Locale) => {
  return locale === 'it' ? itCommonData : enCommonData
}
