import { Metrics, VariationCard } from '@/models/numbers.models'
import { formatThousands } from '@/utils/formatters.utils'
import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { ChartAndTableWrapper } from '../numbers/ChartAndTableWrapper'
import { DataCard } from './DataCard'
import { DataSectionWrapper } from './DataSectionWrapper'
import EServicesByMacroCategories from './EServicesByMacroCategories'
import EServicesByTenantDistribution from './EServicesByTenantDistribution'
import MostSubscribedEServices from './MostSubscribedEservices'
import TopEServices from './TopEServices'
import TopEServicesByToken from './TopEServicesByToken'
import TopProducers from './TopProducers'
import TopProducersBySubscribers from './TopProducersBySubscribers'
import TotalEntiTenantOnboardingTrend from './TotalEntiTenantOnboardingTrend'
import UsageTrend from './UsageTrend'
import { ExternalLink } from '../ExternalLink'
import { DataInfoBox } from './DataInfoBox'

type NumberPageContentProps = {
  data: Metrics
}

const labelOrder = (arr: string[]) => (label: string) => arr.indexOf(label)

const NumbersPageContent: React.FC<NumberPageContentProps> = ({ data }) => {
  const tenantsLabels = ['Totale enti', 'Enti pubblici', 'Enti privati']

  const getTenantsLabelOrder = labelOrder(tenantsLabels)

  const tenantsCard = data.totaleEnti
    .filter((el) => tenantsLabels.includes(el.name))
    .map((el) => {
      return {
        ...el,
        color: el.name === 'Totale enti' ? 'Totale' : 'Pubblici/privati',
      }
    })
    .sort((a, b) => getTenantsLabelOrder(a.name) - getTenantsLabelOrder(b.name))

  const publicTenants = [
    'Comuni',
    'Regioni e Province Autonome',
    'Università e AFAM',
    'Pubbliche amministrazioni centrali',
    'Altri enti pubblici',
  ]

  const getPublicTenantsLabelOrder = labelOrder(publicTenants)

  const macrocategoriesCard = data.totaleEnti
    .filter((el) => !tenantsLabels.includes(el.name))
    .sort((a, b) => getPublicTenantsLabelOrder(a.name) - getPublicTenantsLabelOrder(b.name))

  const totalTenantDistribution = data.distribuzioneDegliEntiPerAttivita.reduce(
    (accumulator, next) => accumulator + next.count,
    0
  )

  const tenantByActivity = [
    'Enti solo fruitori',
    'Enti solo erogatori',
    'Enti sia fruitori che erogatori',
    'Enti con avviati gli sviluppi tecnici',
  ]

  const getTenantsActivityOrder = labelOrder(tenantByActivity)

  const sortTenantActivity = (
    arr: Metrics['distribuzioneDegliEntiPerAttivita']
  ): Metrics['distribuzioneDegliEntiPerAttivita'] =>
    arr.sort((a, b) => getTenantsActivityOrder(a.activity) - getTenantsActivityOrder(b.activity))

  return (
    <Box
      sx={{
        overflowX: 'hidden',
      }}
    >
      <DataSectionWrapper
        anchor="adesione"
        title="Enti aderenti"
        description={
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'flex-end' }}
            spacing={{ xs: 3, md: 0 }}
            justifyContent="space-between"
            sx={{ mt: 8, mb: 3 }}
          >
            <Typography sx={{ maxWidth: 877 }}>
              Per abilitare lo scambio dei dati, ogni ente deve completare un processo di adesione
              alla PDND. Al termine, potrà erogare i propri e-service, cioè i servizi digitali che
              permettono l’accesso ai dati, e fruire di quelli erogati da altri enti.
              <br />
              <strong>
                Quanti enti sono iscritti alla piattaforma e per quali attività la utilizzano?
              </strong>
            </Typography>
            <DataInfoBox>
              L’elenco degli aderenti è disponibile su{' '}
              <ExternalLink
                label="dati.gov.it"
                href="https://www.dati.gov.it/view-dataset/dataset?id=b6e909a0-53cd-417d-a37f-04c11fed8939"
              />
            </DataInfoBox>
          </Stack>
        }
      >
        <Grid spacing={3} container>
          <Grid item xs={12} lg={4}>
            <Grid spacing={3} direction="column" container>
              {tenantsCard.map(({ name, totalCount, lastMonthCount, variation, color }, i) => {
                return (
                  <Grid key={i} item xs={12} lg={4}>
                    <GeneralCard
                      label={name}
                      value={totalCount}
                      varation={{
                        value: lastMonthCount,
                        percentage: variation,
                        label: 'rispetto al mese precedente',
                      }}
                      color={color}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8}>
            <ChartAndTableWrapper
              title="Andamento delle adesioni"
              description="Numero progressivo di enti che hanno aderito alla piattaforma nel tempo"
            >
              <TotalEntiTenantOnboardingTrend data={data.andamentoDelleAdesioni} />
            </ChartAndTableWrapper>
          </Grid>
          <Grid item>
            <Typography sx={{ mt: 4, mb: 2 }}>
              <strong>Dettaglio degli enti pubblici aderenti per tipologia</strong>
            </Typography>
            <Grid container spacing={3}>
              {macrocategoriesCard.map((item, i) => (
                <Grid key={i} item xs={12} lg={4}>
                  <GeneralCard
                    label={item.name}
                    value={item.totalCount}
                    varation={{
                      value: item.lastMonthCount,
                      percentage: item.variation,
                      label: 'rispetto al mese precedente',
                    }}
                    color={item.name}
                  ></GeneralCard>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} lg={8} sx={{ mt: { lg: 3, xs: 5 } }}>
            <ChartAndTableWrapper
              title="Distribuzione degli enti per attività"
              description="Numero di enti aderenti suddiviso in funzione dell’attività che attualmente svolgono sulla piattaforma"
            >
              <EServicesByTenantDistribution
                data={sortTenantActivity(data.distribuzioneDegliEntiPerAttivita)}
                totale={totalTenantDistribution}
              />
            </ChartAndTableWrapper>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ mt: { lg: 3 } }}>
            <Grid spacing={3} container>
              {sortTenantActivity(data.distribuzioneDegliEntiPerAttivita).map((item, i) => (
                <Grid key={i} item xs={12} lg={12}>
                  <GeneralCard
                    label={item.activity}
                    value={item.count}
                    varation={{
                      percentage: ((item.count / totalTenantDistribution) * 100).toFixed(1),
                      label: `su ${formatThousands(totalTenantDistribution)} enti aderenti`,
                    }}
                    color={item.activity}
                  ></GeneralCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DataSectionWrapper>

      {/* </Box> */}

      <DataSectionWrapper
        anchor="pubblicazione"
        title="E-service pubblicati"
        description={
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'flex-end' }}
            spacing={{ xs: 3, md: 0 }}
            justifyContent="space-between"
            sx={{ mt: 8, mb: 3 }}
          >
            <Typography sx={{ maxWidth: 877 }}>
              Gli e-service sono servizi digitali che gli enti erogatori realizzano attraverso lo
              sviluppo di connettori automatici (API) e pubblicano sul catalogo della PDND, per
              consentire agli enti fruitori l’accesso ai dati o l’integrazione di processi.
              <br />
              <strong>
                Quanti e-service sono stati pubblicati a catalogo dagli enti erogatori?
              </strong>
            </Typography>
            <DataInfoBox>
              L’elenco degli e-service è disponibile su{' '}
              <ExternalLink
                label="dati.gov.it"
                href="https://www.dati.gov.it/view-dataset/dataset?id=0dfbeb46-736d-4af3-841c-9593d8f6c434"
              />
            </DataInfoBox>
          </Stack>
        }
      >
        <Grid spacing={3} container>
          <Grid item xs={12} lg={4}>
            <GeneralCard
              label={'E-service pubblicati'}
              value={data.eservicePubblicati.count}
              varation={{
                value: data.eservicePubblicati.lastMonthCount,
                percentage: data.eservicePubblicati.variation,
                label: 'rispetto al mese precedente',
              }}
              color={'E-service pubblicati'}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ChartAndTableWrapper
              title="Distribuzione degli e-service per enti erogatori"
              description="Numero di e-service pubblicati suddivisi per categorie di enti erogatori"
            >
              <EServicesByMacroCategories data={data.distribuzioneEServicePerEntiErogatori} />
            </ChartAndTableWrapper>
          </Grid>
        </Grid>

        <TopProducers data={data.entiChePubblicanoPiuEService} />
      </DataSectionWrapper>

      <DataSectionWrapper
        anchor="abilitazione"
        title="Connessioni fra enti"
        description={
          <>
            Per accedere per la prima volta a un e-service di cui è interessato a fruire, un ente
            deve essere in possesso dei requisiti minimi e richiedere l’abilitazione all’ente
            erogatore, stabilendo una connessione che sarà valida anche per gli accessi successivi.
            <br />
            <strong>Quante connessioni tra enti sono state abilitate e per quali e-service?</strong>
          </>
        }
        background="grey"
      >
        <Grid spacing={3} container>
          <Grid item xs={12} lg={4}>
            <GeneralCard
              label="Connessioni totali"
              value={data.connessioniTotali.totalCount}
              varation={{
                value: data.connessioniTotali.lastMonthCount,
                percentage: data.connessioniTotali.variation,
                label: 'rispetto al mese precedente',
              }}
              color={'Totale'}
            />
          </Grid>
        </Grid>
        <TopProducersBySubscribers data={data.entiConPiuConnessioniAbilitate} />
        <MostSubscribedEServices data={data.eServiceConPiuEntiAbilitati} />
      </DataSectionWrapper>

      <DataSectionWrapper
        anchor="utilizzo"
        title="Utilizzo degli e-service"
        description={
          <>
            Una volta abilitato alla connessione, l’ente può accedere all’e-service attraverso una o
            più sessioni di scambio dati di durata massima prestabilita. La piattaforma verifica
            l’abilitazione e permette l’attivazione automatica e sicura di ogni sessione.
            <br />
            <strong>
              Quante sessioni di scambio dati sono state attivate e per quali e-service?
            </strong>
          </>
        }
      >
        <Grid spacing={3} container>
          <Grid item xs={12} lg={4}>
            <GeneralCard
              label="Totale sessioni di scambio"
              value={data.totaleRichiesteDiAccesso.totalCount}
              varation={{
                value: data.totaleRichiesteDiAccesso.lastMonthCount,
                percentage: data.totaleRichiesteDiAccesso.variation,
                label: 'rispetto al mese precedente',
              }}
              color={'Totale'}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <UsageTrend data={data.attivitaDellaPiattaforma} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TopEServices data={data.eServicePiuUtilizzati} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TopEServicesByToken data={data.eserviceConPiuTokenStaccati} />
          </Grid>
        </Grid>
      </DataSectionWrapper>
    </Box>
  )
}

const GeneralCard = ({
  label,
  value,
  varation,
  color,
}: {
  label: string
  value: number
  varation: VariationCard
  color: string
}) => {
  const variation: VariationCard = {
    percentage: varation.percentage,
    label: varation.label,
    value: varation.value ? formatThousands(varation.value as number) : undefined,
  }

  return (
    <DataCard label={label} value={formatThousands(value)} variation={variation} color={color} />
  )
}

export default NumbersPageContent
