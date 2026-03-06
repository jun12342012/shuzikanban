<template>
  <ModuleCard title="待接管情况">
    <div class="takeover">
      <div class="takeover__cards">
        <DataCard label="待接管系统" :value="data.summary.pendingSystem" color="#ff8c00" suffix="个" />
        <DataCard label="待接管资产" :value="data.summary.pendingAsset" color="#ff8c00" suffix="个" />
        <DataCard label="已接管系统" :value="data.summary.takenSystem" color="#00ff88" suffix="个" />
        <DataCard label="已接管资产" :value="data.summary.takenAsset" color="#00ff88" suffix="个" />
      </div>
      <div class="takeover__body">
        <div class="takeover__chart">
          <v-chart :option="barOption" autoresize />
        </div>
        <div class="takeover__progress">
          <ProgressBar
            v-for="item in topUnits"
            :key="item.name"
            :label="item.name"
            :percent="item.rate"
            :color="item.rate >= 90 ? '#00ff88' : item.rate >= 70 ? '#00e4ff' : '#ff8c00'"
          />
        </div>
      </div>
    </div>
  </ModuleCard>
</template>

<script setup>
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import ModuleCard from '../components/ModuleCard.vue'
import DataCard from '../components/DataCard.vue'
import ProgressBar from '../components/ProgressBar.vue'
import { takeoverData as data } from '../mock/data.js'

use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const topUnits = computed(() =>
  [...data.unitList].sort((a, b) => b.rate - a.rate).slice(0, 7)
)

const barOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['待接管', '已接管'],
    textStyle: { color: '#b2daff', fontSize: 10 },
    top: 0,
    right: 0,
    itemWidth: 10,
    itemHeight: 8
  },
  grid: { left: 50, right: 10, top: 28, bottom: 20 },
  xAxis: {
    type: 'category',
    data: data.unitList.map(u => u.name.replace('市', '').replace('州', '')),
    axisLabel: { color: '#b2daff99', fontSize: 9, rotate: 30 },
    axisLine: { lineStyle: { color: '#0e4a6f' } },
    axisTick: { show: false }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: '#0e4a6f44' } },
    axisLabel: { color: '#b2daff99', fontSize: 9 }
  },
  series: [
    {
      name: '待接管',
      type: 'bar',
      barWidth: 8,
      itemStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ff8c00' }, { offset: 1, color: '#ff8c0044' }] },
        borderRadius: [2, 2, 0, 0]
      },
      data: data.unitList.map(u => u.pending)
    },
    {
      name: '已接管',
      type: 'bar',
      barWidth: 8,
      itemStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#00ff88' }, { offset: 1, color: '#00ff8844' }] },
        borderRadius: [2, 2, 0, 0]
      },
      data: data.unitList.map(u => u.taken)
    }
  ]
}))
</script>

<style scoped>
.takeover {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.takeover__cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  flex-shrink: 0;
}

.takeover__body {
  flex: 1;
  display: flex;
  gap: 8px;
  min-height: 0;
}

.takeover__chart {
  flex: 1.2;
  min-height: 0;
}

.takeover__progress {
  flex: 0.8;
  overflow-y: auto;
  padding-right: 4px;
}
</style>
