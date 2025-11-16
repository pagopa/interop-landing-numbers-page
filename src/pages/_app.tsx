import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { useRouter } from 'next/router'
import { DEFAULT_LOCALE, Locale } from '../configs/constants.config'
import { useState } from 'react'
import { LocaleContext } from '@/contexts/locale.context'
import '../styles/default.css'
import { theme } from '@/configs/theme.config'
import NextAdapterPages from 'next-query-params/pages'
import { QueryParamProvider } from 'use-query-params'
import { TrackingProvider } from '@/configs/tracking.config'

function MyApp({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)
  const router = useRouter()

  return (
    <TrackingProvider>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <ThemeProvider theme={theme}>
          <QueryParamProvider adapter={NextAdapterPages}>
            <Component key={router.asPath} {...pageProps} />
          </QueryParamProvider>
        </ThemeProvider>
      </LocaleContext.Provider>
    </TrackingProvider>
  )
}

export default MyApp
