import { initTracking } from '@pagopa/interop-fe-commons'
import { MIXPANEL_PROJECT_ID, ONETRUST_DOMAIN_SCRIPT_ID } from './constants.config'
import React, { createContext } from 'react'
import { MacroCategory, Timeframe } from '@/models/numbers.models'

// This should be an union of all the possible mixpanel events
type MixPanelEvent =
  | {
      eventName: 'INTEROP_CATALOG_READ'
      properties: MixPanelCatalogReadEventProps
    }
  | {
      eventName: 'INTEROP_CATALOG_FILTER'
      properties: MixPanelCatalogFilterEventProps
    }
  | {
      eventName: 'INTEROP_NUMBERS_ENTI_CHE_PUBBLICANO_PIU_ESERVICE_FILTER'
      properties: MixPanelTenantMoreEservicesEventProps
    }
  | {
      eventName: 'INTEROP_NUMBERS_ENTI_CON_PIU_CONNESSIONI_ABILITATE_FILTER'
      properties: MixPanelTenantMoreConnectionsEventProps
    }
  | {
      eventName: 'INTEROP_NUMBERS_ESERVICE_CON_PIU_ENTI_ABILITATI_FILTER'
      properties: MixPanelEserviceMostTenantsAndMostUsedEservicesEventProps
    }
  | {
      eventName: 'INTEROP_NUMBERS_ATTIVITA_DELLA_PIATTAFORMA_FILTER'
      properties: MixPanelPlatformActivityrEventProps
    }
  | {
      eventName: 'INTEROP_NUMBERS_ESERVICE_PIU_UTILIZZATI_PER_ENTI_FRUITORI_ATTIVI_FILTER'
      properties: MixPanelEserviceMostTenantsAndMostUsedEservicesEventProps
    }
  | {
      eventName: 'INTEROP_NUMBERS_ESERVICE_PIU_UTILIZZATI_PER_SESSIONI_DI_SCAMBIO_FILTER'
      properties: MixPanelEserviceMostTenantsAndMostUsedEservicesEventProps
    }

type MixPanelCatalogReadEventProps = {
  eserviceId: string
  descriptorId: string
}

type MixPanelCatalogFilterEventProps = {
  q?: string
  producersId?: string[]
}

type MixPanelTenantMoreEservicesEventProps = {
  timeRange: Timeframe
  producerMacrocategory: MacroCategory['id'][]
}

type MixPanelTenantMoreConnectionsEventProps = {
  timeRange: Timeframe
  producer: string
  producerMacrocategory: string[]
}

type MixPanelEserviceMostTenantsAndMostUsedEservicesEventProps = {
  timeRange: Timeframe
  producerMacrocategory: MacroCategory['id'][]
  consumerMacrocategory: string
}

type MixPanelPlatformActivityrEventProps = {
  timeRange: Timeframe
  isCumulative: boolean
}

const { trackEvent, useTrackPageViewEvent } = initTracking<MixPanelEvent>({
  enabled: true,
  oneTrustScriptUrl: '/static/local_scripts/oneTrust_production/scripttemplates/otSDKStub.js',
  domainScriptUrl: ONETRUST_DOMAIN_SCRIPT_ID,
  mixpanelToken: MIXPANEL_PROJECT_ID,
  hasOnlyStrictlyNecessaryCookies: true,
})

const TrackingContext = createContext({
  trackEvent,
  useTrackPageViewEvent,
})

export const TrackingProvider = ({ children }: { children: React.ReactNode }) => (
  <TrackingContext.Provider value={{ trackEvent, useTrackPageViewEvent }}>
    {children}
  </TrackingContext.Provider>
)
export const useTrackingContext = () => React.useContext(TrackingContext)
