<template>
  <div
    class="group bg-card border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary/20"
    @click="$emit('click', board.id)"
    @keydown.enter="$emit('click', board.id)"
    @keydown.space.prevent="$emit('click', board.id)"
    role="button"
    tabindex="0"
    :aria-label="`Open board: ${board.title}`"
  >
    <div class="flex items-start justify-between mb-3">
      <h3
        class="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1"
      >
        {{ board.title }}
      </h3>
      <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          @click.stop="$emit('edit', board.id)"
          class="p-1 rounded hover:bg-muted transition-colors"
          aria-label="Edit board"
        >
          <IconEdit class="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </button>
        <button
          @click.stop="$emit('delete', board.id)"
          class="p-1 rounded hover:bg-muted transition-colors"
          aria-label="Delete board"
        >
          <IconTrash class="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </button>
      </div>
    </div>

    <p v-if="board.description" class="text-sm text-muted-foreground mb-4 line-clamp-2">
      {{ board.description }}
    </p>

    <div class="flex items-center justify-between text-sm text-muted-foreground">
      <div class="flex items-center space-x-4">
        <span class="flex items-center">
          <span class="w-2 h-2 bg-primary rounded-full mr-2"></span>
          {{ board.columns.length }} columns
        </span>
        <span class="flex items-center">
          <span class="w-2 h-2 bg-secondary rounded-full mr-2"></span>
          {{ totalCards }} cards
        </span>
      </div>
      <span class="text-xs">
        {{ formatDate(board.updatedAt) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Board } from '@/types'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconTrash from '@/components/icons/IconTrash.vue'

interface Props {
  board: Board
}

interface Emits {
  (e: 'click', boardId: string): void
  (e: 'edit', boardId: string): void
  (e: 'delete', boardId: string): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const totalCards = computed(() => {
  return props.board.columns.reduce((total, column) => total + column.cards.length, 0)
})

const formatDate = (date: Date): string => {
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  return `${Math.floor(diffInDays / 365)} years ago`
}
</script>
