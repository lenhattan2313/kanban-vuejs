<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import { ModalContainer } from '@/components/ui'
import { useAppStore } from '@/stores'

const route = useRoute()
const appStore = useAppStore()

// Initialize stores on app mount
onMounted(async () => {
  await appStore.initializeApp()
})

const activeRoute = computed(() => {
  const path = route.path

  // Handle board routes
  if (path.startsWith('/board') && !path.includes('/settings')) return 'boards'
  if (path.startsWith('/boards')) return 'boards'
  if (path.startsWith('/members')) return 'members'
  if (path.startsWith('/settings')) return 'settings'

  // Handle root redirect
  if (path === '/') return 'boards'

  return 'boards'
})
</script>

<template>
  <AppLayout :active-route="activeRoute">
    <RouterView />
  </AppLayout>

  <!-- Global Modal Container -->
  <ModalContainer />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
