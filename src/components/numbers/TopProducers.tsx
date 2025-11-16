import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { MacroCategory, Timeframe, TopProducersMetric } from '@/models/numbers.models'
import { Typography, useTheme } from '@mui/material'
import * as ECharts from 'echarts'
import React from 'react'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
// import GovItLink from './GovItLink'
import {
  BAR_CHART_NUMERIC_LABEL_COLOR,
  NUMBERS_OF_ELEMENTS_TO_SHOW,
  PRIMARY_BLUE,
} from '@/configs/constants.config'
import { formatThousands } from '@/utils/formatters.utils'
import { FiltersStack } from './FiltersStack'
import { MacroCategoryMultipleSelectInput } from './MacroCategoryMultipleSelectInput'
import { useTrackingContext } from '@/configs/tracking.config'

const TopProducers = ({ data }: { data: TopProducersMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('fromTheBeginning')
  const [providersCategory, setProvidersCategory] = React.useState<MacroCategory['id'][]>([
    '9',
    '12',
  ])

  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    providersCategory: MacroCategory['id'][]
  }>({ timeframe, providersCategory: providersCategory })

  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const midGrey = useTheme().palette.grey[500]
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const currentData = React.useMemo(() => {
    return data[currentSearch.timeframe]
      .filter((x) => currentSearch.providersCategory.includes(x.id as MacroCategory['id']))
      .flatMap((it) => it.data)
      .sort((a, b) => b.count - a.count)
      .slice(0, NUMBERS_OF_ELEMENTS_TO_SHOW)
  }, [data, currentSearch])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const sortedData = currentData?.reverse()
    const yAxisData = sortedData?.map((x) => x.producerName)
    const seriesData = sortedData?.map((x) => x.count)

    return {
      media: [
        {
          query: {
            minWidth: mediaQuerySm,
          },
          option: {
            yAxis: {
              axisLabel: {
                width: 1200,
                overflow: 'none',
              },
            },
          },
        },
      ],
      tooltip: {
        show: true,
        extraCssText: 'white-space: normal',
        confine: true,
        valueFormatter: (value) => `${value} e-service`,
      },
      textStyle: {
        fontFamily: fontFamily,
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
        axisTick: {
          show: false,
        },
        axisLabel: {
          backgroundColor: 'white',
          align: 'left',
          margin: -8,
          padding: [0, 0, 10, 0],
          verticalAlign: 'bottom',
          color: textColorPrimary,
          fontSize: 14,
          width: 280,
          overflow: 'truncate',
        },
      },
      xAxis: {
        name: 'E-service pubblicati',
        nameGap: 40,
        nameLocation: 'middle',
        nameTextStyle: {
          fontSize: 14,
          fontWeight: 800,
          align: 'center',
          verticalAlign: 'middle',
        },
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: midGrey,
          },
        },
        axisLabel: {
          color: midGrey,
          fontSize: 14,
        },
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          color: PRIMARY_BLUE,
          barWidth: 12,
          label: {
            show: true,
            position: 'insideRight',
            distance: -5,
            align: 'left',
            backgroundColor: 'white',
            color: BAR_CHART_NUMERIC_LABEL_COLOR,
          },
        },
      ],
      grid: {
        right: 30,
        left: 5,
        top: 20,
        bottom: 55,
      },
    }
  }, [currentData, textColorPrimary, mediaQuerySm, midGrey, fontFamily])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Erogatore', 'Numero di iscritti']
    const body =
      currentData?.map((x) => [x.producerName, formatThousands(x.count).toString()]) || []
    return { head, body }
  }, [currentData])

  const { trackEvent } = useTrackingContext()

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    trackEvent('INTEROP_NUMBERS_ENTI_CHE_PUBBLICANO_PIU_ESERVICE_FILTER', {
      timeRange: timeframe,
      producerMacrocategory: providersCategory,
    })
    setCurrentSearch({ timeframe, providersCategory: providersCategory })
  }

  return (
    <ChartAndTableWrapper
      title="Enti che pubblicano più e-service"
      description="Gli enti erogatori con più e-service pubblicati"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
          <MacroCategoryMultipleSelectInput
            values={providersCategory}
            onChange={setProvidersCategory}
          />{' '}
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={480}
        info={Info}
        ariaLabel={`Grafico che mostra la top 10 degli enti che pubblicano più e-service. ${tableData.body
          .map((i) => `${i[0]} con ${i[1]} iscritti`)
          .join('; ')}`}
      />
      {/* <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <GovItLink metricName="entiChePubblicanoPiuEService" timeframe={currentSearch.timeframe} />
      </Stack> */}
    </ChartAndTableWrapper>
  )
}

const Info = (
  <Typography color="text.secondary" variant="body2">
    Il conto degli e-service include tutti quelli pubblicati a catalogo.
  </Typography>
)

export default TopProducers
