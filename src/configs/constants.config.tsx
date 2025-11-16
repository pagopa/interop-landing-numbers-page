import { Colors, MacroCategoriesOptions, MacroCategory } from '@/models/numbers.models'

export type Locale = 'it'
export const DEFAULT_LOCALE = 'it'
export const LOCALES = [DEFAULT_LOCALE, 'en']

export const ICONS_PATH = 'static/icons'

export const PAGOPA_HELP_EMAIL = ''

export const SELF_CARE_ONBOARDING_INTEROP_URL =
  'https://selfcare.pagopa.it/auth/login?onSuccess=/onboarding/prod-interop'

export const ONETRUST_DOMAIN_SCRIPT_ID = '77e6a813-8aa7-4091-8cc7-624b5dc60ebc'
export const MIXPANEL_PROJECT_ID = 'f0396c11d4c5139fa30bcc621b2128a0'

export const NUMBERS_OF_ELEMENTS_TO_SHOW = 10
export const INTEROP_NUMBERS_URL = `https://pdnd-prod-dl-1-public-data.s3.eu-central-1.amazonaws.com/dashboard/interop/dashboard-interop.json`

export const LANGUAGES: Record<Locale, Record<Locale, string>> = {
  it: { it: 'Italiano' },
}

export const DATI_GOV_IT_DATASET_HREF = 'https://dati.gov.it/view-dataset'
export const DATI_GOV_IT_OVERVIEW_HREF = `${DATI_GOV_IT_DATASET_HREF}?tags=pdnd&organization=pcm-dipartimento-trasformazione-digitale`
export const PRIMARY_BLUE = '#0062C3'
export const BAR_CHART_NUMERIC_LABEL_COLOR = '#555555'
export const AVERAGE_COLOR = '#F067EC'

export const MACROCATEGORIES_MAP: Readonly<Record<MacroCategory['id'], MacroCategory['name']>> = {
  '0': 'Tutte',
  '1': 'Altre Pubbliche Amministrazioni locali',
  '2': 'Aziende sanitarie locali e Strutture di ricovero',
  '3': 'Comuni',
  '4': 'Enti Nazionali di Previdenza ed Assistenza Sociale',
  '5': 'Province e Citt\u00e0 Metropolitane',
  '6': 'Altre Pubbliche Amministrazioni Centrali',
  '7': 'Regioni e Province Autonome',
  '8': 'Scuole',
  '9': 'Stazioni Appaltanti e Gestori di pubblici servizi',
  '10': 'Universit\u00e0 e AFAM',
  '11': 'Enti privati',
  '12': 'Pubbliche Amministrazioni Centrali',
}
type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

const macroCategoriesOptions: MacroCategoriesOptions = (
  Object.entries(MACROCATEGORIES_MAP) as Entries<Record<MacroCategory['id'], MacroCategory['name']>>
).map(([key, value]) => ({ value: key, label: value }))

const sortMacrocategories = (macroCategories: MacroCategoriesOptions): MacroCategoriesOptions => {
  const sortedWithoutTutte = macroCategories
    .sort((a, b) => (a.label > b.label ? 1 : -1))
    .filter((opt) => opt.label !== 'Tutte')
  return [{ label: 'Tutte', value: '0' }, ...sortedWithoutTutte]
}

export const macroCategoriesOptionsSorted = sortMacrocategories(macroCategoriesOptions)

export const CARD_PUBLIC_PRIVATE_COLOR = '#67ABF0'

export const MACROCATEGORIES_COLORS_MAP = new Map<string, Colors>([
  ['Altre Pubbliche Amministrazioni locali', '#338FEB'],
  ['Aziende sanitarie locali e Strutture di ricovero', '#745726'],
  ['Comuni', '#125C00'],
  ['Province e Citt\u00e0 Metropolitane', '#1B8A00'],
  ['Altre Pubbliche Amministrazioni Centrali', '#67ABF0'],
  ['Pubbliche Amministrazioni Centrali', '#00458A'],
  ['Enti Nazionali di Previdenza ed Assistenza Sociale', '#5385B8'],
  ['Regioni e Province Autonome', '#092E00'],
  ['Scuole', '#EB3F33'],
  ['Universit\u00e0 e AFAM', '#B80090'],
  ['Stazioni Appaltanti e Gestori di pubblici servizi', '#E69000'],
  ['Enti privati', '#444444'],
  ['E-service pubblicati', PRIMARY_BLUE],
  ['Totale', PRIMARY_BLUE],
  ['Tutte', PRIMARY_BLUE],
  ['Enti solo fruitori', '#B80090'],
  ['Enti solo erogatori', '#A4B800'],
  ['Enti sia fruitori che erogatori', '#E69000'],
  ['Enti con avviati gli sviluppi tecnici', '#EB3F33'],
  ['Pubblici/privati', CARD_PUBLIC_PRIVATE_COLOR],
  ['Altri enti pubblici', '#A68856'],
])

export const MACROCATEGORIES_LINK_HREF =
  'https://github.com/italia/pdnd-opendata/tree/main/constants/macrocategories.md'

export const GOV_IT_DATASETS_IDS = {
  totaleEnti: '392525e9-6052-4e3b-a13a-4b34702784a5',
  andamentoDelleAdesioni: '4861f6b2-efcc-4aa1-956c-71e1e639f814',
  andamentoDelleAdesioniPerCategoria: {
    lastSixMonths: '3d03c811-f64d-4bd0-91d0-1775e57f52ef',
    lastTwelveMonths: '3bcb78dd-8304-4a26-a63c-89a5efb1cc92',
    fromTheBeginning: 'fbb17cbf-2b1c-4d59-9c9d-0ce43f50a6c6',
  },
  distribuzioneDegliEntiPerAttivita: '02b74757-fe4b-4ca6-a9e2-3d155429e5c0',
  eservicePubblicati: '0f84c53b-fd71-4429-a77f-7dc6079834f3',
  entiErogatoriDiEService: '04898a6a-0080-4300-9f8e-22160dafe440',
  entiChePubblicanoPiuEService: {
    lastSixMonths: '2d7258d6-9aa4-4227-8792-af258f06ac89',
    lastTwelveMonths: '3e72a8cb-a984-43e1-93a2-58069af8e270',
    fromTheBeginning: 'bd04fbf1-cabd-4042-92f8-581ce2a15956',
  },
  connessioniFraEnti: {
    lastSixMonths: '868cf7c4-1e43-4dca-a53b-b626be1d3648',
    lastTwelveMonths: 'ed1ee35f-7d4d-452e-ad09-e2a3479d86b3',
    fromTheBeginning: '5fa24205-a7a9-4145-aa27-544cde409f8e',
  },
  eServicePiuRichiesti: {
    lastSixMonths: '7e7ef233-13fa-4fa3-b0a8-950e506d143c',
    lastTwelveMonths: '5574dff0-aaaa-4542-ba2e-8a6e88d5ae4f',
    fromTheBeginning: '5245a08c-b210-4754-abae-de01e4a80aa6',
  },
} as const
