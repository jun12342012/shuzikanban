<template>
  <ModuleCard title="工单运行">
    <div class="wo">
      <div class="wo__top">
        <div class="wo__cards">
          <DataCard label="工单总数" :value="data.summary.total" color="#00e4ff" />
          <DataCard label="已完成" :value="data.summary.completed" color="#00ff88" />
          <DataCard label="完成率" :value="data.summary.completedRate + '%'" color="#00ff88" />
          <DataCard label="待完成" :value="data.summary.pending" color="#ff8c00" />
        </div>
        <div class="wo__time-metrics">
          <div class="wo__time-item">
            <span class="wo__time-label">平均处理时长</span>
            <span class="wo__time-value num">{{ data.summary.avgProcessTime }}<small>h</small></span>
          </div>
          <div class="wo__time-item">
            <span class="wo__time-label">平均响应时长</span>
            <span class="wo__time-value num">{{ data.summary.avgResponseTime }}<small>min</small></span>
          </div>
        </div>
      </div>
      <div class="wo__body">
        <div class="wo__left">
          <div class="wo__ring">
            <v-chart :option="ringOption" autoresize />
          </div>
          <div class="wo__level-chart">
            <v-chart :option="levelOption" autoresize />
          </div>
        </div>
        <div class="wo__right">
          <v-chart :option="unitBarOption" autoresize />
        </div>
      </div>
    </div>
  </ModuleCard>
</template>

<script setup>
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import ModuleCard from '../components/ModuleCard.vue'
import DataCard from '../components/DataCard.vue'
import { workOrderData as data } from '../mock/data.js'

use([BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const ringOption = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [{
    type: 'pie',
    radius: ['55%', '75%'],
    center: ['50%', '50%'],
    label: {
      show: true,
      position: 'center',
      formatter: `{a|${data.summary.completedRate}%}\n{b|完成率}`,
      rich: {
        a: { fontSize: 16, fontWeight: 'bold', color: '#00ff88', fontFamily: 'DIN Alternate, Courier New, monospace', lineHeight: 22 },
        b: { fontSize: 10, color: '#b2daff99', lineHeight: 14 }
      }
    },
    data: [
      { value: data.summary.completed, name: '已完成', itemStyle: { color: '#00ff88' } },
      { value: data.summary.pending, name: '待完成', itemStyle: { color: '#ff8c0066' } }
    ]
  }]
}))

const levelOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: { left: 45, right: 10, top: 6, bottom: 18 },
  xAxis: {
    type: 'category',
    data: data.levels.map(l => l.name),
    axisLabel: { color: '#b2daff99', fontSize: 9 },
    axisLine: { lineStyle: { color: '#0e4a6f' } },
    axisTick: { show: false }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: '#0e4a6f44' } },
    axisLabel: { color: '#b2daff99', fontSize: 9 }
  },
  series: [{
    type: 'bar',
    barWidth: 20,
    data: data.levels.map(l => ({
      value: l.count,
      itemStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: l.color }, { offset: 1, color: l.color + '44' }] },
        borderRadius: [2, 2, 0, 0]
      }
    }))
  }]
}))

const unitBarOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['发起总数', '已完成'],
    textStyle: { color: '#b2daff', fontSize: 10 },
    top: 0, right: 0, itemWidth: 10, itemHeight: 8
  },
  grid: { left: 60, right: 10, top: 26, bottom: 6 },
  yAxis: {
    type: 'category',
    data: data.unitOrders.slice(0, 10).map(u => u.name.replace('市', '').replace('州', '')),
    axisLabel: { color: '#b2daff99', fontSize: 9 },
    axisLine: { lineStyle: { color: '#0e4a6f' } },
    axisTick: { show: false }
  },
  xAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: '#0e4a6f44' } },
    axisLabel: { color: '#b2daff99', fontSize: 9 }
  },
  series: [
    {
      name: '发起总数', type: 'bar', barWidth: 8,
      itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#00e4ff44' }, { offset: 1, color: '#00e4ff' }] }, borderRadius: [0, 2, 2, 0] },
      data: data.unitOrders.slice(0, 10).map(u => u.total)
    },
    {
      name: '已完成', type: 'bar', barWidth: 8,
      itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#00ff8844' }, { offset: 1, color: '#00ff88' }] }, borderRadius: [0, 2, 2, 0] },
      data: data.unitOrders.slice(0, 10).map(u => u.completed)
    }
  ]
}))
</script>

<style scoped>
.wo {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.wo__top {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
}

.wo__cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  flex: 1;
}

.wo__time-metrics {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.wo__time-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 228, 255, 0.05);
  border: 1px solid var(--border-primary);
  border-radius: 4px;
  padding: 4px 10px;
}

.wo__time-label {
  font-size: 10px;
  color: var(--text-muted);
}

.wo__time-value {
  font-size: 18px;
  font-weight: bold;
}

.wo__time-value small {
  font-size: 10px;
  color: var(--text-secondary);
  margin-left: 2px;
}

.wo__body {
  flex: 1;
  display: flex;
  gap: 8px;
  min-height: 0;
}

.wo__left {
  flex: 0.8;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 0;
}

.wo__ring {
  flex: 1;
  min-height: 0;
}

.wo__level-chart {
  flex: 1;
  min-height: 0;
}

.wo__right {
  flex: 1.2;
  min-height: 0;
}
</style>
