<template>
  <div class="h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <AppSidebar
      :config="sidebarConfig"
      :is-collapsed="isCollapsed"
      :is-mobile-open="isMobileOpen"
      :active-route="activeRoute"
      @navigation-click="handleNavigationClick"
      @toggle-collapse="toggleCollapse"
      @mobile-close="closeMobile"
      @workspace-menu-click="handleWorkspaceMenuClick"
      @user-settings-click="handleUserSettingsClick"
    />

    <!-- Main Content -->
    <main class="flex-1 bg-white h-[calc(100vh-2rem)] m-4 rounded-lg border border-gray-100">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import type { NavigationItem, SidebarConfig } from '@/types'
import AppSidebar from './AppSidebar.vue'
import { useSidebar } from '@/composables/useSidebar'

interface Props {
  customConfig?: Partial<SidebarConfig>
}

const props = defineProps<Props>()

// Use the sidebar composable
const {
  isCollapsed,
  isMobileOpen,
  activeRoute,
  config: sidebarConfig,
  toggleCollapse,
  closeMobile,
  setActiveRoute,
  updateConfig,
} = useSidebar()

// Get current route
const route = useRoute()

// Watch for route changes to update active route
watch(
  () => route.path,
  (newPath) => {
    setActiveRoute(newPath)
  },
  { immediate: true },
)

// Apply custom config if provided
if (props.customConfig) {
  updateConfig(props.customConfig)
}

// Event handlers
const handleNavigationClick = (item: NavigationItem) => {
  console.log('Navigation clicked:', item)
  // Handle navigation click - could emit to parent or handle here
}

const handleWorkspaceMenuClick = () => {
  console.log('Workspace menu clicked')
  // Handle workspace menu click
}

const handleUserSettingsClick = () => {
  console.log('User settings clicked')
  // Handle user settings click
}
</script>
