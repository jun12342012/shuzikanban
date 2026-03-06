import { ref, onMounted, onUnmounted } from 'vue'

/**
 * @description 大屏自适应缩放 hook，基于 transform scale 实现
 * @param {number} designWidth - 设计稿宽度
 * @param {number} designHeight - 设计稿高度
 * @returns {{ scaleRef: import('vue').Ref<HTMLElement|null> }}
 */
export function useScale(designWidth = 1920, designHeight = 1080) {
  const scaleRef = ref(null)

  function updateScale() {
    if (!scaleRef.value) return
    const wRatio = window.innerWidth / designWidth
    const hRatio = window.innerHeight / designHeight
    const scale = Math.min(wRatio, hRatio)
    scaleRef.value.style.transform = `scale(${scale})`
    scaleRef.value.style.transformOrigin = 'left top'
    scaleRef.value.style.position = 'absolute'
    scaleRef.value.style.left = `${(window.innerWidth - designWidth * scale) / 2}px`
    scaleRef.value.style.top = `${(window.innerHeight - designHeight * scale) / 2}px`
  }

  onMounted(() => {
    updateScale()
    window.addEventListener('resize', updateScale)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScale)
  })

  return { scaleRef }
}
