<template>
  <div class="p-4 border-t border-gray-200">
    <div class="px-3 py-2">
      <div class="flex items-center gap-3" :class="{ 'justify-center': isCollapsed }">
        <!-- User Avatar -->
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
          :class="avatarClass"
        >
          <img
            v-if="user.avatar"
            :src="user.avatar"
            :alt="user.name"
            class="w-full h-full rounded-full object-cover"
          />
          <span v-else>{{ user.avatarText || getUserInitials() }}</span>
        </div>

        <!-- User Info -->
        <div v-if="!isCollapsed" class="flex-1 min-w-0">
          <p class="text-gray-500 text-xs truncate">
            {{ user.email }}
          </p>
        </div>

        <!-- Settings Button -->
        <button
          v-if="showSettings && !isCollapsed"
          @click="handleSettingsClick"
          class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          title="User Settings"
        >
          <Settings class="w-4 h-4 flex-shrink-0" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Settings } from 'lucide-vue-next'

interface SidebarUser {
  id: string
  name: string
  email: string
  avatar?: string
  avatarText?: string
  role?: string
}

interface Props {
  user: SidebarUser
  showSettings?: boolean
  isCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showSettings: true,
  isCollapsed: false,
})

const emit = defineEmits<{
  settingsClick: []
}>()

const handleSettingsClick = () => {
  emit('settingsClick')
}

const avatarClass = computed(() => {
  // Generate a consistent color based on user name
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

  const index = props.user.name.charCodeAt(0) % colors.length
  return colors[index]
})

const getUserInitials = () => {
  return props.user.name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>
