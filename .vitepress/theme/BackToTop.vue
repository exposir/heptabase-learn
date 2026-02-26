<!--
  [INPUT]: 无外部依赖，纯浏览器 API
  [OUTPUT]: 页面右下角返回顶部按钮
  [POS]: .vitepress/theme 的功能组件
  [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
let scrollHandler = null

onMounted(() => {
  scrollHandler = () => {
    visible.value = window.scrollY > 400
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Transition name="fade">
    <button
      v-show="visible"
      class="back-to-top"
      aria-label="返回顶部"
      @click="scrollToTop"
    >
      ↑
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 100;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-brand-1);
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-to-top:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(91, 108, 240, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
