<template>
  <div class="scroll-table" ref="tableRef">
    <div class="scroll-table__header">
      <span
        v-for="col in columns"
        :key="col.key"
        class="scroll-table__th"
        :style="{ flex: col.flex || 1 }"
      >{{ col.title }}</span>
    </div>
    <div class="scroll-table__body" ref="bodyRef">
      <div class="scroll-table__inner" :style="animStyle">
        <div v-for="(row, idx) in doubledRows" :key="idx" class="scroll-table__row">
          <span
            v-for="col in columns"
            :key="col.key"
            class="scroll-table__td"
            :style="{ flex: col.flex || 1 }"
          >
            <slot :name="col.key" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

/**
 * @component ScrollTable
 * @description 自动滚动表格，用于展示故障/变更等动态数据
 * @prop {Array} columns - 列配置 [{ key, title, flex }]
 * @prop {Array} rows - 行数据
 * @prop {number} [speed] - 滚动速度（秒/行）
 */
const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  speed: { type: Number, default: 3 }
})

const bodyRef = ref(null)
const translateY = ref(0)
let timer = null
const rowHeight = 28

const doubledRows = computed(() => {
  if (props.rows.length <= 3) return props.rows
  return [...props.rows, ...props.rows]
})

const animStyle = computed(() => ({
  transform: `translateY(${translateY.value}px)`,
  transition: 'transform 0.5s linear'
}))

function startScroll() {
  if (props.rows.length <= 3) return
  const totalHeight = props.rows.length * rowHeight
  timer = setInterval(() => {
    translateY.value -= rowHeight
    if (Math.abs(translateY.value) >= totalHeight) {
      translateY.value = 0
    }
  }, props.speed * 1000)
}

onMounted(() => startScroll())
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.scroll-table {
  width: 100%;
  font-size: 12px;
}

.scroll-table__header {
  display: flex;
  padding: 4px 0;
  border-bottom: 1px solid var(--border-primary);
  margin-bottom: 4px;
}

.scroll-table__th {
  color: var(--text-secondary);
  font-size: 11px;
  padding: 0 4px;
}

.scroll-table__body {
  overflow: hidden;
  max-height: 84px;
}

.scroll-table__row {
  display: flex;
  height: 28px;
  align-items: center;
  border-bottom: 1px solid rgba(0, 228, 255, 0.06);
}

.scroll-table__row:hover {
  background: rgba(0, 228, 255, 0.05);
}

.scroll-table__td {
  padding: 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-primary);
  font-size: 11px;
}
</style>
