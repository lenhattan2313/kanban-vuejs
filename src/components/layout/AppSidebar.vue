<template>
  <aside class="w-64 flex flex-col h-screen">
    <!-- Logo/Brand -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center gap-2">
        <h1 class="text-xl font-bold text-gray-900">kanban.pr</h1>
      </div>
    </div>

    <!-- Project/Workspace -->
    <div class="p-4 pl-8 pb-0">
      <div class="flex items-center gap-3">
        <div class="w-5 h-5 bg-primary rounded flex items-center justify-center">
          <span class="text-white font-semibold text-sm">T</span>
        </div>
        <span class="text-gray-900 font-medium">testfgf</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4">
      <ul class="space-y-1">
        <li>
          <RouterLink
            to="/boards"
            class="flex items-center gap-3 px-3 py-2 text-gray-900 rounded-md transition-colors"
            :class="{ 'bg-gray-200': isActive('boards') }"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
              />
            </svg>
            Boards
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/members"
            class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            :class="{ 'bg-gray-200 text-gray-900': isActive('members') }"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
              />
            </svg>
            Members
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/settings"
            class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            :class="{ 'bg-gray-200 text-gray-900': isActive('settings') }"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
            Settings
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- User Profile -->
    <div class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span class="text-white font-semibold text-sm">L</span>
        </div>
        <span class="text-gray-900 text-sm">lenhattan2313@gmail.com</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Props {
  activeRoute?: string
}

const props = withDefaults(defineProps<Props>(), {
  activeRoute: 'boards',
})

const isActive = (route: string) => {
  return props.activeRoute === route
}
</script>
