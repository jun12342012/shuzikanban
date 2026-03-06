<template>
  <div class="header">
    <div class="header__top">
      <div class="header__deco header__deco--left"></div>
      <div class="header__center">
        <h1 class="header__title gradient-text">大运维大安全驾驶舱</h1>
        <div class="header__time">
          <span class="header__dot"></span>
          <span>实时监控中</span>
          <span class="header__datetime">{{ dateStr }}</span>
          <span>数据更新: 30秒前</span>
        </div>
      </div>
      <div class="header__deco header__deco--right"></div>
    </div>
    <div class="header__stats">
      <div v-for="item in stats" :key="item.label" class="header__stat-item">
        <div class="header__stat-label">{{ item.label }}</div>
        <NumberRoll :value="item.value" :color="item.color || 'var(--color-cyan)'" />
        <div v-if="item.trend" class="header__stat-trend" :class="item.trend > 0 ? 'up' : 'down'">
          {{ item.trend > 0 ? '↑' : '↓' }} {{ Math.abs(item.trend) }}%
        </div>
      </div>
    </div>
    <div class="header__line"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NumberRoll from './NumberRoll.vue'

/**
 * @component DashboardHeader
 * @description 驾驶舱顶部标题栏，含标题、时间和核心汇总指标
 */
const dateStr = ref('')
let timer = null

function updateTime() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const h = String(now.getHours()).padStart(2, '0')
  const mi = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  dateStr.value = `${y}/${m}/${d} ${h}:${mi}:${s}`
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})
onUnmounted(() => clearInterval(timer))

const stats = ref([
  { label: '待接管系统', value: 156, color: '#ff8c00', trend: -5.2 },
  { label: '已接管系统', value: 1247, color: '#00ff88', trend: 12.5 },
  { label: '正常运行系统', value: 1134, color: '#00ff88', trend: 0.8 },
  { label: '风险系统', value: 114, color: '#ff4757', trend: -3.1 },
  { label: '过期资产', value: 223, color: '#ff8c00', trend: -8.5 },
  { label: '运维人员', value: 359, color: '#00e4ff', trend: 2.1 },
  { label: '工单总数', value: 8555, color: '#00e4ff', trend: 15.3 },
  { label: '项目总数', value: 86, color: '#00ffc6', trend: 6.7 }
])
</script>

<style scoped>
.header {
  flex-shrink: 0;
}

.header__top {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-bottom: 6px;
}

.header__center {
  text-align: center;
}

.header__title {
  font-size: 28px;
  letter-spacing: 8px;
  margin: 0;
  font-weight: 700;
}

.header__time {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.header__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00ff88;
  box-shadow: 0 0 6px #00ff88;
  animation: breathe 2s ease-in-out infinite;
}

.header__datetime {
  color: var(--color-cyan);
}

.header__deco {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-cyan), transparent);
  opacity: 0.5;
}

.header__deco--left {
  left: 40px;
}

.header__deco--right {
  right: 40px;
}

.header__stats {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 6px 20px 0;
}

.header__stat-item {
  flex: 1;
  max-width: 200px;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius);
  padding: 6px 12px;
  text-align: center;
  position: relative;
}

.header__stat-label {
  font-size: 11px;
  color: var(--text-secondary);
  margin-bottom: 2px;
}

.header__stat-value {
  font-size: 22px;
  font-weight: bold;
}

.header__stat-trend {
  font-size: 10px;
  position: absolute;
  right: 6px;
  bottom: 4px;
}

.header__stat-trend.up {
  color: var(--color-success);
}

.header__stat-trend.down {
  color: var(--color-danger);
}

.header__line {
  height: 1px;
  margin-top: 8px;
  background: linear-gradient(90deg, transparent 0%, var(--border-primary) 20%, var(--border-glow) 50%, var(--border-primary) 80%, transparent 100%);
}
</style>
