<template>
  <li>
    <RouterLink
      v-if="item.route"
      :to="item.route"
      class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
      :class="{
        'bg-gray-200 text-gray-900': item.isActive,
        'opacity-50 cursor-not-allowed': item.isDisabled,
        'justify-center': isCollapsed,
      }"
      :disabled="item.isDisabled"
    >
      <component v-if="item.icon" :is="getIconComponent(item.icon)" class="w-5 h-5 flex-shrink-0" />
      <span v-if="!isCollapsed" class="flex-1">{{ item.label }}</span>
      <span
        v-if="item.badge && !isCollapsed"
        class="px-2 py-1 text-xs font-medium bg-primary text-white rounded-full"
      >
        {{ item.badge }}
      </span>
    </RouterLink>

    <button
      v-else
      @click="handleClick"
      class="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
      :class="{
        'bg-gray-200 text-gray-900': item.isActive,
        'opacity-50 cursor-not-allowed': item.isDisabled,
        'justify-center': isCollapsed,
      }"
      :disabled="item.isDisabled"
    >
      <component v-if="item.icon" :is="getIconComponent(item.icon)" class="w-5 h-5 flex-shrink-0" />
      <span v-if="!isCollapsed" class="flex-1 text-left">{{ item.label }}</span>
      <span
        v-if="item.badge && !isCollapsed"
        class="px-2 py-1 text-xs font-medium bg-primary text-white rounded-full"
      >
        {{ item.badge }}
      </span>
      <ChevronRight
        v-if="item.children && item.children.length > 0 && !isCollapsed"
        class="w-4 h-4 transition-transform flex-shrink-0"
        :class="{ 'rotate-90': isExpanded }"
      />
    </button>

    <!-- Nested Navigation Items -->
    <ul
      v-if="item.children && item.children.length > 0 && !isCollapsed"
      class="ml-4 mt-1 space-y-1"
      :class="{ hidden: !isExpanded }"
    >
      <SidebarNavItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :is-collapsed="isCollapsed"
        @item-click="handleChildClick"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  Bell,
  HelpCircle,
  ChevronRight,
} from 'lucide-vue-next'
import type { NavigationItem } from '@/types'

interface Props {
  item: NavigationItem
  isCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isCollapsed: false,
})

const emit = defineEmits<{
  itemClick: [item: NavigationItem]
}>()

const isExpanded = ref(false)

// Simple icon mapping - much cleaner!
const iconMap = {
  'layout-dashboard': LayoutDashboard,
  users: Users,
  settings: Settings,
  'bar-chart-3': BarChart3,
  bell: Bell,
  'help-circle': HelpCircle,
}

const getIconComponent = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || HelpCircle
}

const handleClick = () => {
  if (props.item.children && props.item.children.length > 0) {
    isExpanded.value = !isExpanded.value
  }

  if (props.item.onClick) {
    props.item.onClick()
  }

  emit('itemClick', props.item)
}

const handleChildClick = (childItem: NavigationItem) => {
  emit('itemClick', childItem)
}
</script>
