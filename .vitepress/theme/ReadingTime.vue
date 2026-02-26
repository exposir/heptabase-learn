<!--
  [INPUT]: 依赖 VitePress useData 获取页面内容
  [OUTPUT]: 文章顶部显示字数统计 + 预估阅读时间
  [POS]: .vitepress/theme 的功能组件
  [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
-->
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()

const stats = computed(() => {
  const content = page.value?.content || ''
  // 中文按字符计数，英文按空格分词
  const cn = (content.match(/[\u4e00-\u9fff]/g) || []).length
  const en = content.replace(/[\u4e00-\u9fff]/g, '').split(/\s+/).filter(Boolean).length
  const total = cn + en
  // 中文 300 字/分钟，英文 200 词/分钟，取加权
  const minutes = Math.ceil(cn / 300 + en / 200)
  return { total, minutes: Math.max(1, minutes) }
})

const show = computed(() => {
  return frontmatter.value?.layout !== 'home'
})
</script>

<template>
  <div v-if="show" class="reading-time">
    📖 约 {{ stats.total }} 字 · 预计阅读 {{ stats.minutes }} 分钟
  </div>
</template>

<style scoped>
.reading-time {
  color: var(--vp-c-text-2);
  font-size: 0.85em;
  padding: 8px 0 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
}
</style>
