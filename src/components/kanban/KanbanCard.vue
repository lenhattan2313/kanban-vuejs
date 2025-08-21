<template>
  <div
    class="bg-background border rounded-md p-3 cursor-pointer hover:shadow-md transition-shadow group"
    @click="$emit('click', card)"
  >
    <div class="flex items-start justify-between mb-2">
      <h4 class="font-medium text-foreground flex-1">{{ card.title }}</h4>
      <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <BaseButton variant="ghost" size="sm" class="h-6 w-6 p-0" @click.stop="$emit('edit', card)">
          <IconEdit class="h-3 w-3" />
        </BaseButton>
        <BaseButton
          variant="ghost"
          size="sm"
          class="h-6 w-6 p-0 text-destructive"
          @click.stop="$emit('delete', card)"
        >
          <IconTrash class="h-3 w-3" />
        </BaseButton>
      </div>
    </div>

    <p v-if="card.description" class="text-sm text-muted-foreground mb-3 line-clamp-2">
      {{ card.description }}
    </p>

    <!-- Card Meta -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span :class="priorityClasses[card.priority]" class="text-xs px-2 py-1 rounded-full">
          {{ card.priority }}
        </span>
        <span v-if="card.dueDate" :class="dueDateClasses" class="text-xs px-2 py-1 rounded">
          {{ formatDueDate(card.dueDate) }}
        </span>
      </div>
      <div v-if="card.tags.length" class="flex gap-1">
        <span
          v-for="tag in card.tags.slice(0, 2)"
          :key="tag"
          class="text-xs bg-muted px-2 py-1 rounded"
        >
          {{ tag }}
        </span>
        <span v-if="card.tags.length > 2" class="text-xs text-muted-foreground px-1">
          +{{ card.tags.length - 2 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Card } from '@/types'
import BaseButton from '@/components/ui/Button.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import { formatDueDate } from '@/utils/date'

interface Props {
  card: Card
}

interface Emits {
  (e: 'click', card: Card): void
  (e: 'edit', card: Card): void
  (e: 'delete', card: Card): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const priorityClasses = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
}

const dueDateClasses = computed(() => {
  if (!props.card.dueDate) return ''

  const now = new Date()
  const dueDate = new Date(props.card.dueDate)
  const diffTime = dueDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  } else if (diffDays <= 1) {
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  } else if (diffDays <= 3) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  } else {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  }
})
</script>
