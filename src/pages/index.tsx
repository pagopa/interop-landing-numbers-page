import { Dtd, PageBottomCta } from '@/components'
import { ExternalLink } from '@/components/ExternalLink'
import { SectionSelectInput } from '@/components/SectionSelectInput'
import { DataInfoBox } from '@/components/numbers/DataInfoBox'
import NumbersPageContent from '@/components/numbers/NumbersPageContent'
import { DATI_GOV_IT_OVERVIEW_HREF, INTEROP_NUMBERS_URL } from '@/configs/constants.config'
import { useLocaleContext } from '@/contexts/locale.context'
import { useGetInteropNumbersNew } from '@/services/numbers.services'
import { getCommonData } from '@/static'
import { toFormattedDate } from '@/utils/formatters.utils'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Container, Link, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const anchors = [
  { ref: 'adesione', label: 'Enti aderenti', descr: 'Enti iscritti alla piattaforma' },
  { ref: 'pubblicazione', label: 'E-service pubblicati', descr: 'E-service offerti a catalogo' },
  {
    ref: 'abilitazione',
    label: 'Connessioni fra enti',
    descr: 'Connessioni tra erogatori e fruitori',
  },
  {
    ref: 'utilizzo',
    label: 'Utilizzo degli e-service',
    descr: 'Sessioni di scambio dati',
  },
]

const NumbersPage: NextPage = () => {
  const { locale } = useLocaleContext()
  const commonData = getCommonData(locale)
  const { data: metricsData } = useGetInteropNumbersNew()
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))

  return (
    <>
      <Head>
        <link
          rel="preload"
          href={INTEROP_NUMBERS_URL}
          crossOrigin="anonymous"
          type="application/json"
          as="fetch"
        />
      </Head>
      <Container maxWidth={false} sx={{ maxWidth: 1340 }}>
        <PageTitles title={commonData.pageTitle} publishDate={metricsData?.dataDiPubblicazione} />
      </Container>

      {isMobile ? <SectionSelectInput options={anchors} /> : <PageAnchors />}

      {metricsData && <NumbersPageContent data={metricsData} />}

      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

type PageTitlesType = {
  publishDate?: string
  title: string
}

const PageTitles: React.FC<PageTitlesType> = ({ title, publishDate }) => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-start', md: 'flex-end' }}
      spacing={{ xs: 3, md: 0 }}
      justifyContent="space-between"
      sx={{ mt: 8, mb: 3 }}
    >
      <Box>
        <Box sx={{ maxWidth: 612 }}>
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
          <Typography color="text.primary" sx={{ mt: 1 }}>
            Esplora i <strong>dati relativi all’utilizzo di PDND Interoperabilità</strong>, la
            piattaforma che abilita lo scambio di informazioni tra gli enti. Ogni ente che aderisce
            alla PDND può scambiare informazioni in modo semplice e sicuro, pubblicando sul catalogo
            gli e-service che gestisce e richiedendo la fruizione di quelli di cui ha bisogno.
          </Typography>
        </Box>
      </Box>

      <DataInfoBox>
        I dati sono disponibili come .json e .csv su{' '}
        <ExternalLink label="dati.gov.it" href={DATI_GOV_IT_OVERVIEW_HREF} />
        <Typography sx={{ mt: 1 }} component="p" color="text.secondary" variant="caption-semibold">
          dati aggiornati al {publishDate ? toFormattedDate(new Date(publishDate)) : 'n/d'}
        </Typography>
      </DataInfoBox>
    </Stack>
  )
}

const PageAnchors = () => {
  return (
    <>
      <Container maxWidth={false} sx={{ maxWidth: 1340 }}>
        <Typography sx={{ mb: 1 }}>Esplora i dati:</Typography>
      </Container>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          py: { xs: 2, md: 4 },
          position: 'sticky',
          top: 0,
          zIndex: 10000000,
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: 1340 }}>
          <Stack
            sx={{ color: 'white' }}
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 1, md: 0 }}
          >
            {anchors.map(({ label, ref, descr }, i) => {
              return (
                <Link
                  underline="hover"
                  color="inherit"
                  href={`#${ref}`}
                  key={i}
                  sx={{ flexGrow: 1 }}
                >
                  <Stack direction="column" spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'white', fontWeight: 600 }}
                      >
                        {label}
                      </Typography>
                      <ArrowForwardIcon fontSize="small" sx={{ color: 'white' }} />
                    </Stack>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'white', display: { xs: 'none', md: 'initial' } }}
                    >
                      {descr}
                    </Typography>
                  </Stack>
                </Link>
              )
            })}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default NumbersPage
