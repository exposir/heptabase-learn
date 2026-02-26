/**
 * [INPUT]: 依赖 VitePress 默认主题 + medium-zoom
 * [OUTPUT]: 扩展主题 — 图片放大、阅读时间、返回顶部
 * [POS]: .vitepress/theme 的入口文件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick, h } from 'vue'
import { useRoute, useData } from 'vitepress'
import mediumZoom from 'medium-zoom'
import ReadingTime from './ReadingTime.vue'
import BackToTop from './BackToTop.vue'
import './custom.css'

export default {
  extends: DefaultTheme,

  // 在文档底部插入阅读时间组件
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(ReadingTime),
      'layout-bottom': () => h(BackToTop),
    })
  },

  setup() {
    const route = useRoute()

    const initZoom = () => {
      mediumZoom('.vp-doc img', {
        background: 'var(--vp-c-bg)',
      })
    }

    onMounted(() => initZoom())

    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  },
}
