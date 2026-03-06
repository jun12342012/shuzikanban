<template>
  <div class="progress-bar">
    <div class="progress-bar__info">
      <span class="progress-bar__label">{{ label }}</span>
      <span class="progress-bar__value num">{{ percent }}%</span>
    </div>
    <div class="progress-bar__track">
      <div
        class="progress-bar__fill"
        :style="{ width: percent + '%', background: barGradient }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/**
 * @component ProgressBar
 * @description 进度条组件，用于展示百分比类指标
 * @prop {string} label - 标签
 * @prop {number} percent - 百分比值（0-100）
 * @prop {string} [color] - 主色
 */
const props = defineProps({
  label: { type: String, required: true },
  percent: { type: Number, default: 0 },
  color: { type: String, default: '#00e4ff' }
})

const barGradient = computed(() =>
  `linear-gradient(90deg, ${props.color}88, ${props.color})`
)
</script>

<style scoped>
.progress-bar {
  margin-bottom: 6px;
}

.progress-bar__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
}

.progress-bar__label {
  font-size: 11px;
  color: var(--text-secondary);
}

.progress-bar__value {
  font-size: 12px;
}

.progress-bar__track {
  width: 100%;
  height: 6px;
  background: rgba(0, 228, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease;
}
</style>
