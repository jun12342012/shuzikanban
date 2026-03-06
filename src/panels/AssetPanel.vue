<template>
  <ModuleCard title="资产治理">
    <div class="asset">
      <div class="asset__top">
        <div class="asset__cards">
          <DataCard label="过期资产" :value="data.summary.expired" color="#ff4757" suffix="个" />
          <DataCard label="临保资产" :value="data.summary.nearExpiry" color="#ff8c00" suffix="个" />
          <DataCard label="游离资产" :value="data.summary.floating" color="#ffd700" suffix="个" />
        </div>
      </div>
      <div class="asset__bottom">
        <v-chart :option="barOption" autoresize />
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
import { assetData as data } from '../mock/data.js'

use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const barOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['过期资产', '临保资产', '游离资产'],
    textStyle: { color: '#b2daff', fontSize: 10 },
    top: 0, right: 0, itemWidth: 10, itemHeight: 8
  },
  grid: { left: 50, right: 10, top: 26, bottom: 20 },
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
      name: '过期资产', type: 'bar', barWidth: 6,
      itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ff4757' }, { offset: 1, color: '#ff475744' }] }, borderRadius: [2, 2, 0, 0] },
      data: data.unitList.map(u => u.expired)
    },
    {
      name: '临保资产', type: 'bar', barWidth: 6,
      itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ff8c00' }, { offset: 1, color: '#ff8c0044' }] }, borderRadius: [2, 2, 0, 0] },
      data: data.unitList.map(u => u.nearExpiry)
    },
    {
      name: '游离资产', type: 'bar', barWidth: 6,
      itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ffd700' }, { offset: 1, color: '#ffd70044' }] }, borderRadius: [2, 2, 0, 0] },
      data: data.unitList.map(u => u.floating)
    }
  ]
}))
</script>

<style scoped>
.asset {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.asset__top {
  display: block;
  flex-shrink: 0;
}

.asset__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.asset__bottom {
  flex: 1;
  min-height: 0;
}
</style>
