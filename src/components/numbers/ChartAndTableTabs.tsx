import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material'
import * as echarts from 'echarts'
import React from 'react'

const CHART_HEIGHT_DEFAULT = 600

export type TableData = {
  head: string[]
  body: string[][]
}

type ChartsAndTableTabsProps = {
  chartOptions: echarts.EChartsOption
  tableData: TableData
  chartHeight?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLegendChangeCallback?: (params: any, ref: echarts.ECharts | null) => void
  info?: React.ReactNode
  children?: React.ReactNode
  childrenPosition?: 'top' | 'bottom'
  ariaLabel: string
  /**
   * @description
   * will be false by default.
   * If true, all of the current components will be removed and new components will be created according to the new option.
   * more info: https://echarts.apache.org/en/api.html#echartsInstance.setOption
   */
  notMergeData?: boolean
}

const ChartAndTableTabs_: React.FC<ChartsAndTableTabsProps> = ({
  chartOptions,
  chartHeight,
  onLegendChangeCallback,
  tableData,
  info,
  children,
  childrenPosition,
  ariaLabel,
  notMergeData = false,
}) => {
  const [activeTab, setActiveTab] = React.useState<'chart' | 'table'>('chart')
  const chartRef = React.useRef<echarts.ECharts | null>(null)

  const height = chartHeight ?? CHART_HEIGHT_DEFAULT

  const initChart = (ref: HTMLDivElement | null) => {
    if (!ref) return
    chartRef.current = echarts.init(ref)
    chartRef.current.setOption(chartOptions, notMergeData)

    onLegendChangeCallback &&
      chartRef.current.on('legendselectchanged', (params) => {
        onLegendChangeCallback(params, chartRef.current)
      })
  }

  React.useEffect(() => {
    const resizeChart = () => chartRef.current?.resize()
    window.addEventListener('resize', resizeChart)
    return () => window.removeEventListener('resize', resizeChart)
  }, [])

  return (
    <TabContext value={activeTab}>
      <TabList onChange={(_, v) => setActiveTab(v)}>
        <Tab sx={{ flexGrow: '1' }} label="Grafico" value="chart" />
        <Tab sx={{ flexGrow: '1' }} label="Tabella dati" value="table" />
        {info && <Tab sx={{ flexGrow: '1' }} label="Info" value="info" />}
      </TabList>
      <TabPanel value="chart" sx={{ p: 0 }}>
        {childrenPosition === 'top' && children}
        <Box sx={{ width: '100%', height }} ref={initChart} aria-label={ariaLabel} />
        {childrenPosition === 'bottom' && children}
      </TabPanel>
      <TabPanel value="table" sx={{ px: 0 }}>
        <DataTable data={tableData} height={height} />
      </TabPanel>
      {info && (
        <TabPanel value="info" sx={{ px: 0 }}>
          <InfoPanel content={info} height={height} />
        </TabPanel>
      )}
    </TabContext>
  )
}

const InfoPanel: React.FC<{ content: React.ReactNode; height: number }> = ({ content, height }) => {
  return <Box height={height}>{content}</Box>
}

const DataTable: React.FC<{ data: TableData; height: number }> = ({ data, height }) => {
  const greyBg = useTheme().palette.background.default

  return (
    <Box sx={{ overflow: 'hidden', borderRadius: 1 }}>
      <TableContainer sx={{ height, overflowX: 'auto' }}>
        <Table stickyHeader sx={{ width: '100%', borderRadius: 1 }}>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              {data.head.map((h, i) => (
                <TableCell key={i}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: 'background.paper' }}>
            {data.body.map((row, i) => (
              <TableRow key={i} sx={{ backgroundColor: i % 2 === 0 ? 'transparent' : greyBg }}>
                {row.map((cell, j) => (
                  <TableCell key={j}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export const ChartAndTableTabs = React.memo(ChartAndTableTabs_)
