/* eslint-disable */
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { PlatformActivitiesMetric, SerieDataLineChart, Timeframe } from '@/models/numbers.models'
import {
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import * as ECharts from 'echarts'
import React from 'react'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
// import GovItLink from '../GovItLink'
import { PRIMARY_BLUE } from '@/configs/constants.config'
import { optionLineChart } from '@/utils/charts.utils'
import {
  formatThousands,
  toFormattedLongDate,
  toFormattedNumericDate,
} from '@/utils/formatters.utils'
import { FiltersStack } from './FiltersStack'
import { useTrackingContext } from '@/configs/tracking.config'

enum SeriesDataEnum {
  TotalDataCharts = 1,
  SmaDataCharts = 2,
}
const initialValue = 0

const UsageTrend = ({ data }: { data: PlatformActivitiesMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('fromTheBeginning')
  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    showCumulatedData: boolean
  }>({ timeframe, showCumulatedData: false })

  const fontFamily = useTheme().typography.fontFamily
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const currentData = data[currentSearch.timeframe].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  const dateList: Array<string> = currentData.map((el) => toFormattedNumericDate(new Date(el.date)))
  const totalData: number[] = currentData.map((d) => d.count)
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))

  // This function add each value passed within the function with "initialValue" (sum)
  const cumulativeSum = (
    (sum) => (value: number) =>
      (sum += value)
  )(initialValue)

  const totalCumulativeData = currentData.map((d) => cumulativeSum(d.count))

  const singleChartTotal: SerieDataLineChart = {
    id: SeriesDataEnum.TotalDataCharts,
    type: 'line',
    name: 'Totale sessioni di scambio',
    data: currentSearch.showCumulatedData ? totalCumulativeData : totalData,
    color: PRIMARY_BLUE,
  }

  let seriesData = [singleChartTotal]

  // Show SMA line only if <Switch/> is not enabled
  if (currentSearch.showCumulatedData)
    seriesData = seriesData.filter((d) => d.id !== SeriesDataEnum.SmaDataCharts)

  const tableDataValue = data[currentSearch.timeframe].flatMap((el) => [
    [toFormattedNumericDate(new Date(el.date)), formatThousands(el.count)],
  ])
  const grid = {
    left: isMobile ? 0 : 70,
    right: 30,
    bottom: 140,
    containLabel: true,
  }

  const yAxis = {
    type: 'value',
    axisLabel: {
      formatter: (val: number) => formatThousands(val),
    },
    nameLocation: 'middle',
    name: isMobile ? '' : 'Sessioni di scambio',
    nameGap: 100,
    nameTextStyle: {
      fontWeight: 600,
      align: 'center',
      verticalAlign: 'middle',
    },
  }

  const tooltip = {
    trigger: 'item',
    formatter: (data: any) => {
      return `
      <div style="display:flex; padding-bottom:5px;">
        <strong>${toFormattedLongDate(data.name)}</strong>
      </div>
      <div style="display:flex; justify-content: start; flex-direction :column;">
        <div style="display:flex;  margin-right:5px;  align-items: center;justify-content: start;">
          <div style=" width: 10px;height: 10px;background:
          ${data.color}; border-radius:10px; margin-right:6px;">
          </div>
          <div>
            <span>
              ${formatThousands(Math.round(data.value))} sessioni
            </span>
          </div>
        </div>
      </div>`
    },
  }

  const legendSelectedMode = true
  const legend: ECharts.LegendComponentOption = {
    padding: 0,
    left: 0,
    bottom: 20,
    icon: 'rect',
    itemWidth: 12,
    itemHeight: 12,
    itemGap: 25,
  }
  const chartOptions: ECharts.EChartsOption = optionLineChart(
    fontFamily,
    dateList,
    seriesData,
    mediaQuerySm,
    grid,
    yAxis,
    tooltip,
    legendSelectedMode,
    legend
  )

  const head = ['Data', 'Numero sessioni']
  const body: string[][] = tableDataValue
  const tableData: TableData = { head, body }

  const { trackEvent } = useTrackingContext()

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({ ...currentSearch, timeframe: timeframe })
    trackEvent('INTEROP_NUMBERS_ATTIVITA_DELLA_PIATTAFORMA_FILTER', {
      timeRange: timeframe,
      isCumulative: currentSearch.showCumulatedData,
    })
  }

  const onCumulativeDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch({ timeframe, showCumulatedData: e.target.checked })
  }

  const subTitle = new Map<Timeframe, string>([
    ['lastTwelveMonths', 'mensili'],
    ['fromTheBeginning', 'mensili'],
    ['lastSixMonths', 'ogni 7 giorni'],
  ])

  return (
    <ChartAndTableWrapper
      title="Attività della piattaforma"
      description={`Numero di sessioni di scambio dati ${subTitle.get(currentSearch.timeframe)}`}
    >
      <form onSubmit={onSubmit}>
        <FiltersStack
          additionalFilterNode={
            <FormControlLabel
              control={
                <Switch value={currentSearch.showCumulatedData} onChange={onCumulativeDataChange} />
              }
              label={
                <Typography sx={{ mt: 0.5 }} variant="body2" color="text.secondary">
                  Dato cumulato
                </Typography>
              }
            />
          }
        >
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={480}
        info={Info}
        notMergeData={true}
        ariaLabel="Grafico che mostra il numero di sessioni di scambio giornaliere"
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

const StyledTableCell = ({ children }: { children: React.ReactNode }) => {
  return <TableCell sx={{ padding: '2px 8px', border: 1 }}>{children}</TableCell>
}

const Info = (
  <>
    <Typography color="text.secondary" variant="body2">
      Il numero di sessioni di scambio è calcolato come somma delle sessioni richieste dagli enti
      fruitori (somma dei voucher staccati dalla piattaforma). La media è calcolata sui 30 giorni
      precedenti. Selezionando “Dato cumulato” il grafico mostra il numero di sessioni di scambio
      accumulate nel tempo.
    </Typography>
    <TableContainer sx={{ mt: 2, maxWidth: 400 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3} sx={{ padding: 1 }}>
              Sessioni di scambio
            </TableCell>
          </TableRow>
          <TableRow sx={{ background: '#f2f2f2' }}>
            <StyledTableCell>Giorno</StyledTableCell>
            <StyledTableCell>Valore assoluto</StyledTableCell>
            <StyledTableCell>Valore cumulativo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell>lunedì</StyledTableCell>
            <StyledTableCell>10</StyledTableCell>
            <StyledTableCell>10</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>martedì</StyledTableCell>
            <StyledTableCell>14</StyledTableCell>
            <StyledTableCell>24 (10 + 14)</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>mercoledì</StyledTableCell>
            <StyledTableCell>7</StyledTableCell>
            <StyledTableCell>31 (24 + 7)</StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </>
)

export default UsageTrend
