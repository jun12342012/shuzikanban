<template>
  <span class="number-roll num" :style="{ color, fontSize }">{{ displayValue }}</span>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

/**
 * @component NumberRoll
 * @description 数字滚动动画组件
 * @prop {number} value - 目标数值
 * @prop {number} [duration] - 动画时长（毫秒）
 * @prop {string} [color] - 数字颜色
 * @prop {string} [fontSize] - 字号
 */
const props = defineProps({
  value: { type: Number, default: 0 },
  duration: { type: Number, default: 1500 },
  color: { type: String, default: 'var(--color-cyan)' },
  fontSize: { type: String, default: '22px' }
})

const displayValue = ref(0)

function animate(from, to) {
  const start = performance.now()
  const diff = to - from
  function step(ts) {
    const progress = Math.min((ts - start) / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayValue.value = Math.round(from + diff * eased).toLocaleString()
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => animate(0, props.value))
watch(() => props.value, (nv, ov) => animate(ov, nv))
</script>

<style scoped>
.number-roll {
  font-weight: bold;
  line-height: 1.2;
}
</style>
