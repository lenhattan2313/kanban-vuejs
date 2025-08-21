<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <KanbanHeader :board="currentBoard" @settings="openSettings" @add-card="openAddCard" />

    <!-- Main Content -->
    <main class="flex-1 overflow-hidden">
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div
            class="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"
          />
          <p class="text-muted-foreground">Loading board...</p>
        </div>
      </div>

      <div v-else-if="error" class="flex items-center justify-center py-12">
        <div class="text-center">
          <p class="text-destructive mb-4">{{ error }}</p>
          <BaseButton @click="fetchBoard('1')">Try Again</BaseButton>
        </div>
      </div>

      <div v-else-if="currentBoard" class="h-full p-6">
        <!-- Board Stats -->
        <div class="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <span>{{ boardColumns.length }} columns</span>
          <span>{{ totalCards }} cards</span>
        </div>

        <!-- Kanban Columns -->
        <div class="flex gap-4 overflow-x-auto pb-4 h-full">
          <KanbanColumn
            v-for="column in boardColumns"
            :key="column.id"
            :column="column"
            @edit="editColumn"
            @add-card="addCardToColumn"
            @card-click="openCard"
            @card-edit="editCard"
            @card-delete="deleteCard"
          />

          <!-- Add Column Button -->
          <div class="flex-shrink-0 w-80">
            <BaseButton variant="outline" class="w-full h-32 border-dashed" @click="addColumn">
              + Add Column
            </BaseButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useKanbanStore } from '@/stores/kanban'
import BaseButton from '@/components/ui/Button.vue'
import KanbanHeader from '@/components/kanban/KanbanHeader.vue'
import KanbanColumn from '@/components/kanban/KanbanColumn.vue'
import type { Card, Column } from '@/types'

const route = useRoute()
const kanbanStore = useKanbanStore()

const { currentBoard, boardColumns, totalCards, isLoading, error, fetchBoard } = kanbanStore

const openCard = (card: Card) => {
  console.log('Opening card:', card)
  // TODO: Open card modal
}

const addCardToColumn = (columnId: string) => {
  console.log('Adding card to column:', columnId)
  // TODO: Open add card modal
}

const addColumn = () => {
  console.log('Adding new column')
  // TODO: Open add column modal
}

const openSettings = () => {
  console.log('Opening settings')
  // TODO: Navigate to settings
}

const openAddCard = () => {
  console.log('Opening add card modal')
  // TODO: Open add card modal
}

const editColumn = (column: Column) => {
  console.log('Editing column:', column)
  // TODO: Open edit column modal
}

const editCard = (card: Card) => {
  console.log('Editing card:', card)
  // TODO: Open edit card modal
}

const deleteCard = (card: Card) => {
  console.log('Deleting card:', card)
  // TODO: Confirm and delete card
}

onMounted(() => {
  const boardId = route.params.id as string
  fetchBoard(boardId)
})
</script>
