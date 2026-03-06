<template>
  <ModuleCard title="人力效能">
    <div class="eff">
      <div class="eff__cards">
        <DataCard label="运维总人数" :value="data.summary.totalStaff" color="#00e4ff" suffix="人" />
        <DataCard label="在岗总数" :value="data.summary.onDuty" color="#00ff88" suffix="人" />
        <DataCard :label="'在岗率'" :value="data.summary.onDutyRate + '%'" color="#00ffc6" />
      </div>
      <div class="eff__body">
        <div class="eff__chart">
          <v-chart :option="barOption" autoresize />
        </div>
        <div class="eff__metrics">
          <div class="eff__metric-header">
            <span class="eff__col">团队</span>
            <span class="eff__col">完成率</span>
            <span class="eff__col">处理时长</span>
            <span class="eff__col">响应时长</span>
          </div>
          <div v-for="t in data.teams" :key="t.name" class="eff__metric-row">
            <span class="eff__col eff__team-name">{{ t.name.replace('组', '') }}</span>
            <span class="eff__col num" style="color:#00ff88">{{ t.orderCompleteRate }}%</span>
            <span class="eff__col num">{{ t.orderAvgTime }}h</span>
            <span class="eff__col num">{{ t.orderAvgResponse }}min</span>
          </div>
          <div class="eff__alert-section">
            <div class="eff__alert-title">告警处理率</div>
            <ProgressBar
              v-for="t in data.teams"
              :key="t.name"
              :label="t.name.replace('组', '')"
              :percent="t.alertRate"
              :color="t.alertRate >= 90 ? '#00ff88' : t.alertRate >= 70 ? '#00e4ff' : '#ff8c00'"
            />
          </div>
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
import { efficiencyData as data } from '../mock/data.js'

use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const barOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['人员总数', '在岗数'],
    textStyle: { color: '#b2daff', fontSize: 10 },
    top: 0, right: 0, itemWidth: 10, itemHeight: 8
  },
  grid: { left: 45, right: 10, top: 26, bottom: 24 },
  xAxis: {
    type: 'category',
    data: data.teams.map(t => t.name.replace('运维', '').replace('组', '')),
    axisLabel: { color: '#b2daff99', fontSize: 9 },
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
      name: '人员总数', type: 'bar', barWidth: 12,
      itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#00e4ff' }, { offset: 1, color: '#00e4ff44' }] }, borderRadius: [2, 2, 0, 0] },
      data: data.teams.map(t => t.total)
    },
    {
      name: '在岗数', type: 'bar', barWidth: 12,
      itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#00ff88' }, { offset: 1, color: '#00ff8844' }] }, borderRadius: [2, 2, 0, 0] },
      data: data.teams.map(t => t.onDuty)
    }
  ]
}))
</script>

<style scoped>
.eff {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.eff__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  flex-shrink: 0;
}

.eff__body {
  flex: 1;
  display: flex;
  gap: 8px;
  min-height: 0;
}

.eff__chart {
  flex: 1;
  min-height: 0;
}

.eff__metrics {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 10px;
  overflow-y: auto;
}

.eff__metric-header {
  display: flex;
  gap: 4px;
  padding: 3px 0;
  border-bottom: 1px solid var(--border-primary);
  color: var(--text-secondary);
  font-size: 10px;
  flex-shrink: 0;
}

.eff__metric-row {
  display: flex;
  gap: 4px;
  padding: 3px 0;
  border-bottom: 1px solid rgba(0, 228, 255, 0.06);
  align-items: center;
}

.eff__col {
  flex: 1;
  text-align: center;
  font-size: 10px;
}

.eff__team-name {
  color: var(--text-primary);
  text-align: left;
}

.eff__alert-section {
  margin-top: 6px;
  flex-shrink: 0;
}

.eff__alert-title {
  font-size: 11px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}
</style>
