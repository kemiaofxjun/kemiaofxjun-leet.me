<script setup>
import { onMounted, ref } from 'vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()
const isClient = ref(false)

onMounted(() => {
  isClient.value = true

  // 注入样式
  const styleLink = document.createElement('link')
  styleLink.rel = 'stylesheet'
  styleLink.href = 'https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.css'
  document.head.appendChild(styleLink)

  // 设置配置项
  window.UserConfig = {
    private_api_url: 'https://fc.kemeow.top/',
    page_turning_number: 24,
    error_img: 'https://pic.imgdb.cn/item/6695daa4d9c307b7e953ee3d.jpg',
  }

  // 注入脚本
  const script = document.createElement('script')
  script.src = 'https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.js'
  script.defer = true
  document.body.appendChild(script)
})
</script>

<template>
  <section v-if="isClient" class="friend-circle-lite" :class="{ dark: isDark }">
    <h2>📰 友链朋友圈 Lite</h2>
    <div id="friend-circle-lite-root">
      加载中…
    </div>
  </section>
</template>

<style scoped>
.friend-circle-lite {
  padding: 2em;
  --bg-color: #f9f9f9;
  --text-color: #333;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.friend-circle-lite.dark {
  --bg-color: #1a1a1a;
  --text-color: #ccc;
}

#friend-circle-lite-root {
  background-color: var(--bg-color);
  color: var(--text-color);
  border-radius: 8px;
  padding: 1em;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
