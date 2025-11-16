export type Timeframe = 'lastSixMonths' | 'lastTwelveMonths' | 'fromTheBeginning'

export type MacroCategory =
  | { id: '0'; name: 'Tutte' }
  | { id: '1'; name: 'Altre Pubbliche Amministrazioni locali' }
  | { id: '2'; name: 'Aziende sanitarie locali e Strutture di ricovero' }
  | { id: '3'; name: 'Comuni' }
  | { id: '4'; name: 'Enti Nazionali di Previdenza ed Assistenza Sociale' }
  | { id: '5'; name: 'Province e Citt\u00e0 Metropolitane' }
  | { id: '6'; name: 'Altre Pubbliche Amministrazioni Centrali' }
  | { id: '7'; name: 'Regioni e Province Autonome' }
  | { id: '8'; name: 'Scuole' }
  | { id: '9'; name: 'Stazioni Appaltanti e Gestori di pubblici servizi' }
  | { id: '10'; name: 'Universit\u00e0 e AFAM' }
  | { id: '11'; name: 'Enti privati' }
  | { id: '12'; name: 'Pubbliche Amministrazioni Centrali' }

export type MacroCategoriesOption = {
  value: MacroCategory['id']
  label: MacroCategory['name']
}

export type MacroCategoriesOptions = Array<MacroCategoriesOption>

export type OtherCategories =
  | 'E-service pubblicati'
  | 'Totale'
  | 'Enti solo fruitori'
  | 'Enti solo erogatori'
  | 'Enti sia fruitori che erogatori'
  | 'Enti con avviati gli sviluppi tecnici'
  | 'Pubblici/privati'
  | 'Altri enti pubblici'

export type Colors =
  | '#338FEB'
  | '#745726'
  | '#125C00'
  | '#1B8A00'
  | '#00458A'
  | '#5385B8'
  | '#092E00'
  | '#A4B800'
  | '#EB3F33'
  | '#B80090'
  | '#A68856'
  | '#E69000'
  | '#444444'
  | '#A3ADB7'
  | '#0062C3'
  | '#555555'
  | '#F067EC'
  | '#67ABF0'

export type SeriesDataLineChart = SerieDataLineChart[]

export interface SerieDataLineChart {
  id?: number
  type: string
  name: string
  data: number[]
  color?: string
}

export type PublishedEServicesMetric = {
  count: number
  lastMonthCount: number
  variation: number
}

export type OnboardedTenantsCount = {
  totalCount: number
  lastMonthCount: number
  variation: number
  name: string
}

export type TotalConnectionCount = {
  totalCount: number
  lastMonthCount: number
  variation: number
}

export type UsageCountMetric = {
  totalCount: number
  lastMonthCount: number
  variation: number
}
export type GeneralDataCard = {
  label: string
  value: number
  varationValue?: number
  varationPercentage: number
  varationLabel: string
  color: string
  varation: VariationCard
}

export type VariationCard = {
  label: string
  value?: string | number
  percentage: string | number
}

export type TenantDistributionCount = {
  activity: string
  count: number
}

export type TimedMetric<T> = {
  lastSixMonths: T
  lastTwelveMonths: T
  fromTheBeginning: T
}

export type TimeMetricKeys = keyof TimedMetric<unknown>

type OnboardingTrend = {
  date: string
  count: number
}
export type TopProducersMetric = TimedMetric<
  Array<{
    id: string
    name: string
    data: Array<{
      producerName: string
      count: number
    }>
  }>
>

export type TenantOnboardingTrendMetric = OnboardingTrend[]

export type MacrocategoriesOnboardingTrendMetric = TimedMetric<
  Array<{ id: string; name: string; data: OnboardingTrend[]; totalCount?: number }>
>

export type TopProducersBySubscribersMetric = TimedMetric<
  Array<{
    id: string
    name: string
    data: Array<{
      producerName: string
      producerId: string
      macroCategories: Array<{ id: string; name: string; subscribersCount: number }>
    }>
  }>
>

export type TopEservicesData = {
  id: string
  name: string
  mostConsumedEServices: Array<{
    eserviceName: string
    producerName: string
    subscribersCount: number
  }>
}
export type TopEServiceMetricItem = {
  id: string
  name: string
  data: Array<TopEservicesData>
}

export type TopEservicesMetric = TimedMetric<Array<TopEServiceMetricItem>>
export type TopEservicesByTokenMetric = TimedMetric<
  Array<{
    id: string
    name: string
    data: Array<{
      id: string
      name: string
      mostConsumedEServices: Array<{
        eserviceId: string
        eserviceName: string
        producerName: string
        tokenCount: number
      }>
    }>
  }>
>

export type MostSubscribedEServicesMetric = TimedMetric<
  Array<{
    id: string
    name: string
    data: Array<{
      id: string
      name: string
      mostSubscribedEServices: Array<{
        eserviceName: string
        producerName: string
        subscribersCount: number
      }>
    }>
  }>
>

export type PlatformActivitiesMetric = TimedMetric<Array<{ date: string; count: number }>>

export type EServicesByMacroCategoriesMetric = Array<{
  id: MacroCategory['id']
  name: string
  count: number
}>

export type Metrics = {
  dataDiPubblicazione: string
  totaleEnti: OnboardedTenantsCount[]
  connessioniTotali: TotalConnectionCount
  andamentoDelleAdesioni: TenantOnboardingTrendMetric
  andamentoDelleAdesioniPerCategoria: MacrocategoriesOnboardingTrendMetric
  distribuzioneDegliEntiPerAttivita: TenantDistributionCount[]
  eservicePubblicati: PublishedEServicesMetric
  distribuzioneEServicePerEntiErogatori: EServicesByMacroCategoriesMetric
  entiChePubblicanoPiuEService: TopProducersMetric
  entiConPiuConnessioniAbilitate: TopProducersBySubscribersMetric
  eServiceConPiuEntiAbilitati: MostSubscribedEServicesMetric
  totaleRichiesteDiAccesso: UsageCountMetric
  attivitaDellaPiattaforma: PlatformActivitiesMetric
  eServicePiuUtilizzati: TopEservicesMetric
  eserviceConPiuTokenStaccati: TopEservicesByTokenMetric
}
