import {
  ICONS_PATH,
  PAGOPA_HELP_EMAIL,
  SELF_CARE_ONBOARDING_INTEROP_URL,
} from '@/configs/constants.config'
import { Link } from '@mui/material'
import { PageBottomCtaProps, DtdProps } from '@/components'

const assistance = {
  label: 'Assistenza',
  ariaLabel: 'assistenza',
  href: `mailto:${PAGOPA_HELP_EMAIL}`,
}

/** PageBottomCta mocked data */
const pageBottomCta: PageBottomCtaProps = {
  // icon: <ExampleIcon style={{ width: 48, height: 48, color: 'white' }} />,
  icon: (
    <img
      width={56}
      height={56}
      src={`/${ICONS_PATH}/login.svg`}
      alt="Icona che rappresenta il login"
    />
  ),
  title: 'Da dove si inizia?',
  subtitle:
    'Inserisci i dati richiesti, invia il documento di adesione firmato dal Legale Rappresentante e inizia subito a usare Interoperabilità',
  ctaLink: {
    label: 'Aderire',
    ariaLabel: 'Aderire',
    href: SELF_CARE_ONBOARDING_INTEROP_URL,
  },
}
/* ************************************** */

/** Dtd logo */
const dtd: DtdProps = {
  description: <>Progetto realizzato e gestito da PagoPA S.p.A. per</>,
  logo: (
    <Link
      href="http://innovazione.gov.it/dipartimento"
      title="Vai al sito: Dipartimento per la trasformazione digitale"
      target="_blank"
      rel="noreferrer"
      sx={{ display: 'block' }}
    >
      <img
        width={280}
        src={`/${ICONS_PATH}/dtd_blue-nofill-text-right.svg`}
        alt="Logo Dipartimento per la trasformazione digitale"
      />
    </Link>
  ),
}
/* ************************************** */

/** Application Data Mock */
export const itCommonData = {
  assistance,
  dtd,
  pageBottomCta,
  pageTitle: 'I numeri della PDND',
}
