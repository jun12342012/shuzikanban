<template>
  <span class="status-tag" :style="tagStyle">{{ text }}</span>
</template>

<script setup>
import { computed } from 'vue'

/**
 * @component StatusTag
 * @description 状态标签组件
 * @prop {string} text - 标签文字
 * @prop {string} [type] - 类型: success / warning / danger / info
 */
const props = defineProps({
  text: { type: String, required: true },
  type: { type: String, default: 'info' }
})

const colorMap = {
  success: '#00ff88',
  warning: '#ff8c00',
  danger: '#ff4757',
  info: '#00e4ff'
}

const tagStyle = computed(() => {
  const c = colorMap[props.type] || colorMap.info
  return {
    color: c,
    borderColor: c,
    backgroundColor: `${c}15`
  }
})
</script>

<style scoped>
.status-tag {
  display: inline-block;
  padding: 1px 6px;
  font-size: 10px;
  border: 1px solid;
  border-radius: 2px;
  line-height: 1.6;
  white-space: nowrap;
}
</style>
