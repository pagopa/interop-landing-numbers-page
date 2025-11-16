import { formatThousands, toFormattedLongDate } from './formatters.utils'
import * as ECharts from 'echarts'

interface ChartItem {
  value: number
  color: string
  seriesName: string
}
export function tooltipLinearChart(data: Array<unknown>, type: 'TOTAL' | 'GENERAL') {
  const formattedDate = toFormattedLongDate(
    (data as Array<{ axisValueLabel: string }>)[0].axisValueLabel
  )
  let tooltip = `<div style="display:flex; padding-bottom:15px;">
                  <strong>${formattedDate}</strong>            
                </div>`
  data.map((item) => {
    tooltip += formatTooltipItem(item as ChartItem, type)
  })

  return tooltip
}

function formatTooltipItem(item: ChartItem, type: 'TOTAL' | 'GENERAL'): string {
  const label =
    type === 'TOTAL'
      ? `${item.value ? formatThousands(item.value) : 0} enti totali`
      : `${(item.value || 0).toFixed(1)}%`

  return `<div style="display:flex; justify-content: start;">
  <div style="display:flex;  margin-right:5px;  display: flex; align-items: center;justify-content: center;">
    <div style=" width: 10px;height: 10px;background: ${item.color}; border-radius:10px;"></div>
    </div>
    <div>
      <span>
        ${label}
      </span>
    </div>
  </div>`
}

export function optionLineChart(
  fontFamily: string | (string & object) | undefined,
  data: string[],
  seriesData: Datum[],
  mediaQuerySm?: number,
  grid?: ECharts.GridComponentOption,
  yAxis?: unknown,
  tooltip?: unknown,
  legendSelectedMode?: boolean,
  legend?: ECharts.LegendComponentOption
): ECharts.EChartsOption {
  return {
    textStyle: {
      fontFamily,
    },
    tooltip: tooltip || {
      trigger: 'axis',
      formatter: (data: ECharts.TooltipComponentFormatterCallbackParams) => {
        return tooltipLinearChart(data as unknown[], 'TOTAL')
      },
    },
    legend: legend || {
      show: true,
      bottom: 20,
      left: 'left',
      selectedMode: Boolean(legendSelectedMode),
      // textStyle: {
      //   fontSize: 14,
      // },
      // icon: 'rect',
      // itemGap: 12,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 8,
      itemStyle: {
        borderWidth: 0,
      },
    },
    media: [
      {
        query: {
          minWidth: mediaQuerySm,
        },
        option: {
          grid: {
            bottom: 100,
          },
        },
      },
    ],
    grid: grid
      ? grid
      : {
          left: 10,
          right: 30,
          bottom: 60,
          containLabel: true,
        },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data,
    },
    yAxis: yAxis
      ? yAxis
      : {
          type: 'value',
          axisLabel: {
            formatter: (val: number) => formatThousands(val),
          },
        },
    series: seriesData.sort((one: Datum, two: Datum) => (one.name > two.name ? 1 : -1)),
  }
}

type Datum = {
  name: string
}
