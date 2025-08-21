<template>
  <div class="flex-shrink-0 w-80">
    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 h-full">
      <!-- Column Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-gray-900">{{ column.title }}</h3>
        <span class="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">
          {{ column.cards.length }}
        </span>
      </div>

      <!-- Column Cards -->
      <div class="space-y-3 flex-1">
        <div
          v-for="card in column.cards"
          :key="card.id"
          class="bg-white border border-gray-200 rounded-md p-3 cursor-pointer hover:shadow-md transition-shadow"
          @click="$emit('card-click', card)"
        >
          <h4 class="font-medium text-gray-900 mb-2">{{ card.title }}</h4>
          <p v-if="card.description" class="text-sm text-gray-600 mb-3 line-clamp-2">
            {{ card.description }}
          </p>

          <!-- Card Meta -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span :class="priorityClasses[card.priority]" class="text-xs px-2 py-1 rounded-full">
                {{ card.priority }}
              </span>
            </div>
            <div v-if="card.tags.length" class="flex gap-1">
              <span
                v-for="tag in card.tags.slice(0, 2)"
                :key="tag"
                class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {{ tag }}
              </span>
              <span v-if="card.tags.length > 2" class="text-xs text-gray-500 px-1">
                +{{ card.tags.length - 2 }}
              </span>
            </div>
          </div>
        </div>

        <!-- Add Card Button -->
        <BaseButton
          variant="ghost"
          size="sm"
          class="w-full justify-start text-gray-500 hover:text-gray-700"
          @click="$emit('add-card', column.id)"
        >
          + Add Card
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/Button.vue'
import type { Column, Card } from '@/types'

interface Props {
  column: Column
}

defineProps<Props>()

interface Emits {
  edit: [column: Column]
  'add-card': [columnId: string]
  'card-click': [card: Card]
  'card-edit': [card: Card]
  'card-delete': [card: Card]
}

defineEmits<Emits>()

const priorityClasses = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
}
</script>
