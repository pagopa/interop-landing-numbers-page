import { INTEROP_NUMBERS_URL } from '@/configs/constants.config'
import { Metrics } from '@/models/numbers.models'
import { SWRConfiguration } from 'swr'
import useSWRImmutable from 'swr/immutable'
import { fetcher } from './swr.services'

export function useGetInteropNumbersNew(config?: SWRConfiguration) {
  return useSWRImmutable<Metrics>(INTEROP_NUMBERS_URL, fetcher, config)
}
