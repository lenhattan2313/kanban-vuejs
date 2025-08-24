<template>
  <aside
    class="flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 relative"
    :class="[
      isCollapsed ? 'w-16' : 'w-64',
      isMobileOpen ? 'fixed inset-y-0 left-0 z-50' : '',
      features?.mobileResponsive ? 'lg:relative' : '',
    ]"
  >
    <!-- Mobile Overlay -->
    <div
      v-if="isMobileOpen && features?.mobileResponsive"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="handleMobileClose"
    />

    <!-- Brand/Logo Section -->
    <SidebarBrand v-if="brand" :brand="brand" :is-collapsed="isCollapsed" />

    <!-- Workspace Info Section -->
    <SidebarWorkspaceInfo
      v-if="workspace && features?.showWorkspaceInfo"
      :workspace="workspace"
      :show-menu="!isCollapsed"
      :is-collapsed="isCollapsed"
      @menu-click="handleWorkspaceMenuClick"
    />

    <!-- Navigation Section -->
    <nav class="flex-1 px-4 overflow-y-auto">
      <ul class="space-y-1">
        <SidebarNavItem
          v-for="item in processedNavigation"
          :key="item.id"
          :item="item"
          :is-collapsed="isCollapsed"
          @item-click="handleNavigationClick"
        />
      </ul>
    </nav>

    <!-- User Profile Section -->
    <SidebarUserProfile
      v-if="user && features?.showUserProfile"
      :user="user"
      :show-settings="!isCollapsed"
      :is-collapsed="isCollapsed"
      @settings-click="handleUserSettingsClick"
    />

    <!-- Collapse Toggle Button -->
    <button
      v-if="features?.collapsible"
      @click="handleToggleCollapse"
      class="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
      title="Toggle Sidebar"
    >
      <ChevronLeft
        class="w-3 h-3 text-gray-600 transition-transform"
        :class="{ 'rotate-180': isCollapsed }"
      />
    </button>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SidebarConfig, NavigationItem } from '@/types'
import { markActiveRoute } from '@/config/navigation'
import SidebarBrand from './SidebarBrand.vue'
import SidebarWorkspaceInfo from './SidebarWorkspaceInfo.vue'
import SidebarNavItem from './SidebarNavItem.vue'
import SidebarUserProfile from './SidebarUserProfile.vue'
import { ChevronLeft } from 'lucide-vue-next'

interface Props {
  config: SidebarConfig
  isCollapsed?: boolean
  isMobileOpen?: boolean
  activeRoute?: string
}

const props = withDefaults(defineProps<Props>(), {
  isCollapsed: false,
  isMobileOpen: false,
  activeRoute: '/boards',
})

const emit = defineEmits<{
  navigationClick: [item: NavigationItem]
  toggleCollapse: []
  mobileClose: []
  workspaceMenuClick: []
  userSettingsClick: []
}>()

// Extract config properties
const brand = computed(() => props.config.brand)
const workspace = computed(() => props.config.workspace)
const user = computed(() => props.config.user)
const features = computed(() => props.config.features)

// Process navigation with active route
const processedNavigation = computed(() => {
  return markActiveRoute(props.config.navigation, props.activeRoute)
})

const handleNavigationClick = (item: NavigationItem) => {
  emit('navigationClick', item)
}

const handleMobileClose = () => {
  emit('mobileClose')
}

const handleWorkspaceMenuClick = () => {
  emit('workspaceMenuClick')
}

const handleUserSettingsClick = () => {
  emit('userSettingsClick')
}

const handleToggleCollapse = () => {
  emit('toggleCollapse')
}
</script>

<style scoped>
/* Custom scrollbar for navigation */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
