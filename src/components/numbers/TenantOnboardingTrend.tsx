/* eslint-disable */
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import {
  MacrocategoriesOnboardingTrendMetric,
  SeriesDataLineChart,
  Timeframe,
} from '@/models/numbers.models'
import { Typography, useMediaQuery, useTheme } from '@mui/material'
import * as ECharts from 'echarts'
import React from 'react'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
// import GovItLink from './GovItLink'
import { MACROCATEGORIES_COLORS_MAP } from '@/configs/constants.config'
import { optionLineChart } from '@/utils/charts.utils'
import { toFormattedLongDate, toFormattedNumericDate } from '@/utils/formatters.utils'
import { FiltersStack } from './FiltersStack'
import { MacrocategoriesLink } from './MacrocategoriesLink'

const TenantOnboardingTrend = ({ data }: { data: MacrocategoriesOnboardingTrendMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('fromTheBeginning')
  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
  }>({ timeframe })

  const fontFamily = useTheme().typography.fontFamily
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))

  const currentData = data[currentSearch.timeframe]

  const dateList: Array<string> = data[currentSearch.timeframe][0].data.map((el) =>
    toFormattedNumericDate(new Date(el.date))
  )

  const seriesData: SeriesDataLineChart = currentData.map((el) => ({
    type: 'line',
    name: el.name,
    data: el.data.map((element) => (element.count / el.totalCount!) * 100),
    color: MACROCATEGORIES_COLORS_MAP.get(el.name),
  }))

  const tableDataValue = data[currentSearch.timeframe].flatMap((el) =>
    el.data.map((element) => [
      el.name,
      toFormattedNumericDate(new Date(element.date)),
      element.count,
    ])
  )
  const grid = {
    left: !isMobile ? 70 : 10,
    right: 30,
    bottom: 220,
    containLabel: true,
  }

  const yAxis = {
    type: 'value',
    nameLocation: 'middle',
    name: '% enti aderenti',
    nameGap: 80,
    nameTextStyle: {
      fontWeight: 600,
      align: 'center',
      verticalAlign: 'middle',
    },
  }

  const tooltip = {
    trigger: 'item',
    formatter: (n: any) => {
      const currentItem = currentData.find((it) => it.name === n.seriesName)
      const currentValue = currentItem?.data[n.dataIndex]
      const formattedDate = toFormattedLongDate(n.name)
      return `<div style="display:flex; padding-bottom:15px;">
            <strong>${formattedDate}</strong>
          </div>
          <div style="display:flex; justify-content: space-between;">
            <div style="display: flex; align-items: center; flex-shrink: 0;">
              <div style="margin-right: 5px; width: 10px; height: 10px; background: ${
                n.color
              }; border-radius: 100%"></div>
              ${n.seriesName}
            </div>
            <span style="margin-left: 16px">${currentValue?.count} (${(n.value || 0).toFixed(
              1
            )}%)</span>
          </div>`
    },
  }

  const legendSelectedMode = true
  const chartOptions: ECharts.EChartsOption = optionLineChart(
    fontFamily,
    dateList,
    seriesData,
    mediaQuerySm,
    grid,
    yAxis,
    tooltip,
    legendSelectedMode
  )

  const head = ['Macrocategoria', 'Data', 'Adesioni (%)']
  const body: any = tableDataValue
  const tableData: TableData = { head, body }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({ timeframe })
  }

  return (
    <ChartAndTableWrapper
      title="Andamento delle adesioni per categoria di ente pubblico"
      description="Percentuale di adesione degli enti sul totale della categoria"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={480}
        info={Info}
        ariaLabel="Grafico che mostra lo stato di adesione percentuale per macrocategoria di ente."
      />
      {/* <Stack direction="row" justifyContent="space-between">
        <GovItLink
          metricName="andamentoDelleAdesioniPerCategoria"
          timeframe={currentSearch.timeframe}
        />
      </Stack> */}
    </ChartAndTableWrapper>
  )
}

const Info = (
  <Typography color="text.secondary" variant="body2">
    Ogni categoria è composta dal totale dei relativi enti aggregati secondo le macrocategorie
    presenti nel <MacrocategoriesLink />. Calcolo per ogni categoria: enti che aderiscono a
    PDND/totale degli enti presenti su IPA *100.
  </Typography>
)

export default TenantOnboardingTrend
