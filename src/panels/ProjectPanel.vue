<template>
  <ModuleCard title="项目情况">
    <div class="proj">
      <div class="proj__top">
        <div class="proj__stage-cards">
          <div v-for="s in stageList" :key="s.label" class="proj__stage-item">
            <span class="proj__stage-num num" :style="{ color: s.color }">{{ s.value }}</span>
            <span class="proj__stage-label">{{ s.label }}</span>
          </div>
        </div>
        <div class="proj__risk-lights">
          <div class="proj__light" v-for="r in riskList" :key="r.label">
            <span class="proj__light-dot" :style="{ background: r.color, boxShadow: `0 0 8px ${r.color}` }"></span>
            <span class="proj__light-label">{{ r.label }}</span>
            <span class="proj__light-num num" :style="{ color: r.color }">{{ r.value }}</span>
          </div>
        </div>
      </div>
      <div class="proj__body">
        <div class="proj__ring">
          <v-chart :option="typeOption" autoresize />
        </div>
        <div class="proj__bar">
          <v-chart :option="unitOption" autoresize />
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
import { projectData as data } from '../mock/data.js'

use([BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const stageList = [
  { label: '未开始', value: data.stage.notStarted, color: '#b2daff' },
  { label: '立项阶段', value: data.stage.approval, color: '#00e4ff' },
  { label: '实施阶段', value: data.stage.implementing, color: '#1890ff' },
  { label: '建设完成', value: data.stage.completed, color: '#00ff88' },
  { label: '运行维护', value: data.stage.maintaining, color: '#00ffc6' }
]

const riskList = [
  { label: '正常', value: data.riskStatus.normal, color: '#00ff88' },
  { label: '预警', value: data.riskStatus.warning, color: '#ff8c00' },
  { label: '延期', value: data.riskStatus.overdue, color: '#ff4757' }
]

const typeColors = ['#00e4ff', '#1890ff', '#ff8c00', '#00ffc6']

const typeOption = computed(() => ({
  tooltip: { trigger: 'item' },
  legend: {
    orient: 'vertical',
    right: 4,
    top: 'center',
    textStyle: { color: '#b2daff', fontSize: 10 },
    itemWidth: 8,
    itemHeight: 8
  },
  series: [{
    type: 'pie',
    radius: ['45%', '68%'],
    center: ['35%', '50%'],
    label: { show: false },
    data: data.types.map((t, i) => ({
      value: t.value,
      name: t.name,
      itemStyle: { color: typeColors[i] }
    }))
  }]
}))

const unitOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['未开始', '实施中', '已完成'],
    textStyle: { color: '#b2daff', fontSize: 10 },
    top: 0, right: 0, itemWidth: 10, itemHeight: 8
  },
  grid: { left: 50, right: 10, top: 26, bottom: 20 },
  xAxis: {
    type: 'category',
    data: data.unitProjects.map(u => u.name.replace('市', '').replace('州', '')),
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
      name: '未开始', type: 'bar', stack: 'proj', barWidth: 12,
      itemStyle: { color: '#b2daff88' },
      data: data.unitProjects.map(u => u.notStarted)
    },
    {
      name: '实施中', type: 'bar', stack: 'proj', barWidth: 12,
      itemStyle: { color: '#1890ff' },
      data: data.unitProjects.map(u => u.implementing)
    },
    {
      name: '已完成', type: 'bar', stack: 'proj', barWidth: 12,
      itemStyle: { color: '#00ff88' },
      data: data.unitProjects.map(u => u.completed)
    }
  ]
}))
</script>

<style scoped>
.proj {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.proj__top {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-shrink: 0;
}

.proj__stage-cards {
  display: flex;
  gap: 6px;
  flex: 1;
}

.proj__stage-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 228, 255, 0.05);
  border: 1px solid var(--border-primary);
  border-radius: 3px;
  padding: 4px 6px;
}

.proj__stage-num {
  font-size: 20px;
  font-weight: bold;
}

.proj__stage-label {
  font-size: 10px;
  color: var(--text-secondary);
}

.proj__risk-lights {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
}

.proj__light {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
}

.proj__light-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  animation: breathe 2s ease-in-out infinite;
}

.proj__light-label {
  color: var(--text-secondary);
  width: 28px;
}

.proj__light-num {
  font-size: 14px;
  font-weight: bold;
}

.proj__body {
  flex: 1;
  display: flex;
  gap: 8px;
  min-height: 0;
}

.proj__ring {
  flex: 0.8;
  min-height: 0;
}

.proj__bar {
  flex: 1.2;
  min-height: 0;
}
</style>
