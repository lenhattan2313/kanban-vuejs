<template>
  <div class="h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <AppSidebar :active-route="activeRoute" />

    <!-- Main Content -->
    <main class="flex-1 bg-white h-[calc(100vh-2rem)] m-4 rounded-lg border border-gray-200">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'

interface Props {
  activeRoute?: string
}

withDefaults(defineProps<Props>(), {
  activeRoute: 'boards',
})
</script>
