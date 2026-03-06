<template>
  <div class="data-card" :style="{ borderLeftColor: color }">
    <div class="data-card__label">{{ label }}</div>
    <div class="data-card__value num" :style="{ color }">{{ displayValue }}</div>
    <div v-if="suffix" class="data-card__suffix">{{ suffix }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/**
 * @component DataCard
 * @description 数据指标卡片，展示单个 KPI 数据
 * @prop {string} label - 指标名称
 * @prop {number|string} value - 指标值
 * @prop {string} [suffix] - 后缀文字（如 "个"、"%"）
 * @prop {string} [color] - 主题色
 */
const props = defineProps({
  label: { type: String, required: true },
  value: { type: [Number, String], default: 0 },
  suffix: { type: String, default: '' },
  color: { type: String, default: 'var(--color-cyan)' }
})

const displayValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString()
  }
  return props.value
})
</script>

<style scoped>
.data-card {
  background: rgba(0, 228, 255, 0.05);
  border-left: 3px solid var(--color-cyan);
  border-radius: 2px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  transition: background 0.3s, box-shadow 0.3s;
}

.data-card:hover {
  background: rgba(0, 228, 255, 0.1);
  box-shadow: 0 0 12px rgba(0, 228, 255, 0.15);
}

.data-card__label {
  font-size: 12px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.data-card__value {
  font-size: 22px;
  font-weight: bold;
  line-height: 1.2;
}

.data-card__suffix {
  font-size: 11px;
  color: var(--text-muted);
}
</style>
