<script setup>
import { onMounted, ref } from 'vue'
import { useDark } from '@vueuse/core'

const links = ref([])
const isDark = useDark()

onMounted(async () => {
  if (typeof window === 'undefined')
    return

  try {
    const res = await fetch('https://link-app.20050815.xyz/api/links?status=approved')
    const data = await res.json()
    links.value = Array.isArray(data) ? data : data.links || []
  }
  catch (err) {
    console.error('获取友链失败:', err)
  }
})
</script>

<template>
  <section class="friend-link-wall" :class="{ dark: isDark }">
    <h2>🤝 已批准的友链</h2>
    <div class="link-grid">
      <article
        v-for="link in links"
        :key="link.id"
        class="link-card"
      >
        <a :href="link.link" target="_blank" rel="noopener">
          <img
            v-if="link.avatar"
            :src="link.avatar"
            alt="logo"
            class="link-logo"
          >
          <div class="link-info">
            <strong>{{ link.name }}</strong>
            <p v-if="link.descr">{{ link.descr }}</p>
          </div>
        </a>
      </article>
    </div>
    <p v-if="!links.length" class="empty-tip">
      暂无已批准的友链
    </p>
  </section>
</template>

<style scoped>
.friend-link-wall {
  padding: 2em;
  --bg-color: #f9f9f9;
  --text-color: #333;
  --card-bg: #fff;
  --card-border: #ddd;
  --hover-shadow: rgba(0, 0, 0, 0.1);
  background-color: var(--bg-color);
  color: var(--text-color);
}

.friend-link-wall.dark {
  --bg-color: #1a1a1a;
  --text-color: #ccc;
  --card-bg: #2a2a2a;
  --card-border: #444;
  --hover-shadow: rgba(255, 255, 255, 0.1);
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5em;
}

.link-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 10px;
  padding: 1em;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px var(--hover-shadow);
}

.link-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-bottom: 0.5em;
  border-radius: 50%;
}

.link-info strong {
  display: block;
  font-size: 1.1em;
  margin-bottom: 0.3em;
}

.link-info p {
  font-size: 0.9em;
  color: var(--text-color);
}

.empty-tip {
  margin-top: 2em;
  text-align: center;
  font-style: italic;
  color: var(--text-color);
}
</style>
