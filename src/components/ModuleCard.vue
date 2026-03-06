<template>
  <div class="module-card">
    <div class="module-card__header">
      <span class="module-card__icon"></span>
      <span class="module-card__title">{{ title }}</span>
    </div>
    <div class="module-card__body">
      <slot />
    </div>
    <!-- 四角装饰 -->
    <i class="corner corner--tl"></i>
    <i class="corner corner--tr"></i>
    <i class="corner corner--bl"></i>
    <i class="corner corner--br"></i>
  </div>
</template>

<script setup>
/**
 * @component ModuleCard
 * @description 通用模块卡片容器，带科技感边框和角标装饰
 * @prop {string} title - 模块标题
 */
defineProps({
  title: { type: String, required: true }
})
</script>

<style scoped>
.module-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: glow 4s ease-in-out infinite;
  backdrop-filter: blur(4px);
}

.module-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 228, 255, 0.03), transparent);
  animation: scanLine 6s linear infinite;
  pointer-events: none;
}

@keyframes scanLine {
  0% { left: -60%; }
  100% { left: 160%; }
}

.module-card__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: linear-gradient(90deg, rgba(0, 228, 255, 0.15) 0%, transparent 100%);
  border-bottom: 1px solid var(--border-primary);
  flex-shrink: 0;
}

.module-card__icon {
  width: 4px;
  height: 14px;
  background: var(--color-cyan);
  border-radius: 2px;
  flex-shrink: 0;
}

.module-card__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-cyan);
  letter-spacing: 2px;
}

.module-card__body {
  flex: 1;
  padding: 10px 14px;
  overflow: hidden;
  min-height: 0;
}

.corner {
  position: absolute;
  width: 10px;
  height: 10px;
  pointer-events: none;
}

.corner--tl {
  top: -1px;
  left: -1px;
  border-top: 2px solid var(--color-cyan);
  border-left: 2px solid var(--color-cyan);
}

.corner--tr {
  top: -1px;
  right: -1px;
  border-top: 2px solid var(--color-cyan);
  border-right: 2px solid var(--color-cyan);
}

.corner--bl {
  bottom: -1px;
  left: -1px;
  border-bottom: 2px solid var(--color-cyan);
  border-left: 2px solid var(--color-cyan);
}

.corner--br {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid var(--color-cyan);
  border-right: 2px solid var(--color-cyan);
}
</style>
