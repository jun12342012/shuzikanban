<template>
  <ModuleCard title="风险管控">
    <div class="risk">
      <!-- 四色状态卡片 -->
      <div class="risk__status-row">
        <div class="risk__status-card" v-for="s in statusCards" :key="s.label"
          :style="{ borderLeftColor: s.color }">
          <span class="risk__status-label">{{ s.label }}</span>
          <span class="risk__status-num num" :style="{ color: s.color }">{{ s.value }}</span>
          <div class="risk__status-sub">
            <span>工单 <b class="num">{{ s.orders }}</b></span>
            <span>告警 <b class="num">{{ s.alerts }}</b></span>
          </div>
        </div>
      </div>
      <div class="risk__body">
        <!-- 左侧: 滚动表格 -->
        <div class="risk__tables">
          <div class="risk__table-section">
            <div class="risk__table-title">重大故障 <span class="num">{{ data.majorFaultCount }}</span></div>
            <ScrollTable :columns="faultCols" :rows="data.faults">
              <template #status="{ value }">
                <StatusTag :text="value" :type="faultStatusType(value)" />
              </template>
            </ScrollTable>
          </div>
          <div class="risk__table-section">
            <div class="risk__table-title">重大变更 <span class="num">{{ data.majorChangeCount }}</span></div>
            <ScrollTable :columns="changeCols" :rows="data.changes">
              <template #status="{ value }">
                <StatusTag :text="value" :type="changeStatusType(value)" />
              </template>
            </ScrollTable>
          </div>
        </div>
        <!-- 右侧: 各单位风险柱状图 -->
        <div class="risk__chart">
          <v-chart :option="barOption" autoresize />
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
import ScrollTable from '../components/ScrollTable.vue'
import StatusTag from '../components/StatusTag.vue'
import { riskData as data } from '../mock/data.js'

use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const statusCards = computed(() => [
  { label: '高危', value: data.summary.highRisk, color: '#ff4757', orders: data.statusWorkOrders.high.pending, alerts: data.statusWorkOrders.high.alert },
  { label: '中危', value: data.summary.midRisk, color: '#ff8c00', orders: data.statusWorkOrders.mid.pending, alerts: data.statusWorkOrders.mid.alert },
  { label: '低危', value: data.summary.lowRisk, color: '#ffd700', orders: data.statusWorkOrders.low.pending, alerts: data.statusWorkOrders.low.alert },
  { label: '健康', value: data.summary.healthy, color: '#00ff88', orders: data.statusWorkOrders.healthy.pending, alerts: data.statusWorkOrders.healthy.alert }
])

const faultCols = [
  { key: 'content', title: '故障内容', flex: 3 },
  { key: 'status', title: '状态', flex: 1 }
]
const changeCols = [
  { key: 'content', title: '变更内容', flex: 3 },
  { key: 'status', title: '状态', flex: 1 }
]

/** @param {string} s */
function faultStatusType(s) {
  if (s === '已恢复') return 'success'
  if (s === '处理中') return 'warning'
  return 'danger'
}

/** @param {string} s */
function changeStatusType(s) {
  if (s === '已完成') return 'success'
  if (s === '执行中') return 'warning'
  if (s === '审批中') return 'info'
  return 'danger'
}

const barOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['高危', '中危', '低危'],
    textStyle: { color: '#b2daff', fontSize: 10 },
    top: 0, right: 0, itemWidth: 10, itemHeight: 8
  },
  grid: { left: 50, right: 10, top: 26, bottom: 20 },
  xAxis: {
    type: 'category',
    data: data.unitRisk.map(u => u.name.replace('市', '').replace('州', '')),
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
      name: '高危', type: 'bar', stack: 'risk', barWidth: 12,
      itemStyle: { color: '#ff4757' },
      data: data.unitRisk.map(u => u.high)
    },
    {
      name: '中危', type: 'bar', stack: 'risk', barWidth: 12,
      itemStyle: { color: '#ff8c00' },
      data: data.unitRisk.map(u => u.mid)
    },
    {
      name: '低危', type: 'bar', stack: 'risk', barWidth: 12,
      itemStyle: { color: '#ffd700' },
      data: data.unitRisk.map(u => u.low)
    }
  ]
}))
</script>

<style scoped>
.risk {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.risk__status-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  flex-shrink: 0;
}

.risk__status-card {
  background: rgba(0, 228, 255, 0.05);
  border-left: 3px solid;
  border-radius: 2px;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.risk__status-label {
  font-size: 11px;
  color: var(--text-secondary);
}

.risk__status-num {
  font-size: 20px;
  font-weight: bold;
}

.risk__status-sub {
  display: flex;
  gap: 8px;
  font-size: 10px;
  color: var(--text-muted);
}

.risk__status-sub b {
  color: var(--text-primary);
  font-size: 11px;
}

.risk__body {
  flex: 1;
  display: flex;
  gap: 8px;
  min-height: 0;
}

.risk__tables {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;
}

.risk__table-section {
  flex: 1;
}

.risk__table-title {
  font-size: 11px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.risk__table-title .num {
  color: var(--color-cyan);
  margin-left: 4px;
}

.risk__chart {
  flex: 1;
  min-height: 0;
}
</style>
