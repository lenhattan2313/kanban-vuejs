<template>
  <div class="px-4">
    <div class="px-3 py-2">
      <div class="flex items-center gap-3" :class="{ 'justify-center': isCollapsed }">
        <!-- Workspace Avatar -->
        <div
          class="w-5 h-5 rounded flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
          :class="avatarClass"
        >
          <img
            v-if="workspace.avatar"
            :src="workspace.avatar"
            :alt="workspace.name"
            class="w-full h-full rounded object-cover"
          />
          <span v-else>{{ workspace.avatarText || getWorkspaceInitials() }}</span>
        </div>

        <!-- Workspace Name -->
        <span v-if="!isCollapsed" class="text-gray-900 font-medium truncate">
          {{ workspace.name }}
        </span>

        <!-- Workspace Menu Button -->
        <button
          v-if="showMenu && !isCollapsed"
          @click="handleMenuClick"
          class="ml-auto p-1 text-gray-400 hover:text-gray-600 transition-colors"
          title="Workspace Options"
        >
          <MoreVertical class="w-4 h-4 flex-shrink-0" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MoreVertical } from 'lucide-vue-next'

interface Workspace {
  id: string
  name: string
  avatar?: string
  avatarText?: string
}

interface Props {
  workspace: Workspace
  showMenu?: boolean
  isCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showMenu: false,
  isCollapsed: false,
})

const emit = defineEmits<{
  'menu-click': []
}>()

const handleMenuClick = () => {
  emit('menu-click')
}

const avatarClass = computed(() => {
  // Generate a consistent color based on workspace name
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-teal-500',
  ]

  const index = props.workspace.name.charCodeAt(0) % colors.length
  return colors[index]
})

const getWorkspaceInitials = () => {
  return props.workspace.name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>
