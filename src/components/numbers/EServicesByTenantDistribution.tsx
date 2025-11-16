/* eslint-disable */
import { formatThousands } from '@/utils/formatters.utils'
import { Typography, useTheme } from '@mui/material'
import React from 'react'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
// import GovItLink from './GovItLink'
import { MACROCATEGORIES_COLORS_MAP } from '@/configs/constants.config'
import { TenantDistributionCount } from '@/models/numbers.models'
import { Box } from '@mui/system'
import * as echarts from 'echarts'

const PACK_SIZE = 348

const EServicesByTenantDistribution = ({
  data,
  totale,
}: {
  data: TenantDistributionCount[]
  totale: number
}) => {
  const primaryText = useTheme().palette.text.primary
  const fontFamily = useTheme().typography.fontFamily
  const dataChart: Array<{ value: number; name: string }> = []
  const dataColorChart: Array<string> = []

  data.map((item) => {
    dataChart.push({ value: item.count, name: item.activity })
    dataColorChart.push(MACROCATEGORIES_COLORS_MAP.get(item.activity) as string)
  })

  const tableData: TableData = React.useMemo(() => {
    const head = ["Categoria d'ente", 'Enti aderenti']
    const body = data.map(({ activity, count }) => [activity, formatThousands(count).toString()])

    return { head, body }
  }, [data])

  const chartOptions: echarts.EChartsOption = {
    textStyle: {
      fontFamily: fontFamily,
    },
    tooltip: {
      trigger: 'item',
      confine: true,
      formatter: (data: any) => {
        return `
        <div style="display:flex; padding-bottom:5px;">
          <strong>${data.name}</strong>
        </div>
        <div style="display:flex; justify-content: start; flex-direction :column;">
          <div style="display:flex;  margin-right:5px;  align-items: center;justify-content: start;">
            <div style=" width: 10px;height: 10px;background:
            ${data.color}; border-radius:10px; margin-right:6px;">
            </div>
            <div>
              <span>
                 ${formatThousands(data.value)}
                  (${((data.value / totale) * 100).toFixed(1)}% degli aderenti)
              </span>
            </div>
          </div>
        </div>`
      },
    },
    grid: {
      top: 0,
    },
    title: {
      text: 'Totale Enti',
      textStyle: {
        fontSize: 14,
        fontWeight: 600,
        color: primaryText,
      },
      subtext: formatThousands(totale),
      subtextStyle: {
        fontSize: 18,
        fontWeight: 600,
        color: primaryText,
      },
      itemGap: 12,
      left: 'center',
      right: 'center',
      top: 120,
      bottom: 'center',
    },
    legend: {
      padding: 0,
      left: 0,
      bottom: 20,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 8,
      itemStyle: {
        borderWidth: 0,
      },
    },
    series: [
      {
        center: ['50%', 140],
        type: 'pie',
        radius: [80, 120],
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2,
        },
        avoidLabelOverlap: true,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        color: dataColorChart,
        labelLine: {
          show: false,
        },
        data: dataChart,
      },
    ],
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLegendChangeCallback = (params: any, chartRef: echarts.ECharts | null) => {
    const currentValue = Object.keys(params.selected).reduce((acc, next) => {
      if (params.selected[next]) {
        const activityValue = dataChart.find((d) => d.name === next)?.value || 0
        return acc + activityValue
      }
      return acc
    }, 0)

    chartRef?.setOption({ title: { subtext: formatThousands(currentValue) } })
  }

  return (
    <React.Fragment>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        onLegendChangeCallback={onLegendChangeCallback}
        tableData={tableData}
        chartHeight={PACK_SIZE}
        info={Info}
        childrenPosition="bottom"
        ariaLabel={`Grafico che mostra la distribuzione degli enti per attività. ${tableData.body
          .map((i) => `${i[0]}: ${i[1]} enti`)
          .join('; ')}`}
      />
      {/* <Stack direction="row" justifyContent="space-between">
        <GovItLink metricName="distribuzioneDegliEntiPerAttivita" />
      </Stack> */}
    </React.Fragment>
  )
}

const Info = (
  <Typography color="text.secondary" variant="body2" component="div">
    Nella categoria “enti con avviati gli sviluppi tecnici” sono inclusi gli enti che:
    <Box component="ul" sx={{ m: 0 }}>
      <Box component="li">
        hanno completato il processo di adesione amministrativa ma attualmente non erogano né
        fruiscono degli e-service;
      </Box>
      <Box component="li">in passato hanno erogato un e-service che oggi non è più attivo.</Box>
    </Box>
    <br />
    Nella categoria “fruitori” sono inclusi gli enti che hanno effettuato almeno una richiesta di
    abilitazione (fruizione) ad un e-service, accettata dall'erogatore.
    <br />
    <br />
    Nella categoria “erogatori” sono inclusi gli enti che erogano almeno un e-service a catalogo.
  </Typography>
)

export default EServicesByTenantDistribution
