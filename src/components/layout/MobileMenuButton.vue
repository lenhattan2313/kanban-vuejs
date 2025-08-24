<template>
  <button
    @click="$emit('toggle')"
    class="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
    :class="{ 'bg-gray-100': isOpen }"
    title="Toggle Menu"
  >
    <Menu v-if="!isOpen" class="w-6 h-6" />
    <X v-else class="w-6 h-6" />
  </button>
</template>

<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

interface Props {
  isOpen: boolean
}

defineProps<Props>()

defineEmits<{
  toggle: []
}>()
</script>
