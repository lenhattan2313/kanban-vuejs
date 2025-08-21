<template>
  <header class="border-b bg-white px-6 py-4">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          {{ board?.title || 'Kanban Board' }}
        </h1>
        <p v-if="board?.description" class="text-sm text-gray-600 mt-1">
          {{ board.description }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton variant="outline" size="sm" @click="$emit('settings')"> Settings </BaseButton>
        <BaseButton size="sm" @click="$emit('add-card')"> Add Card </BaseButton>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/Button.vue'
import type { Board } from '@/types'

interface Props {
  board?: Board | null
}

defineProps<Props>()

interface Emits {
  settings: []
  'add-card': []
}

defineEmits<Emits>()
</script>
