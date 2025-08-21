<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="border-b bg-card">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-foreground">
              {{ currentBoard?.title || 'Kanban Board' }}
            </h1>
            <p v-if="currentBoard?.description" class="text-sm text-muted-foreground mt-1">
              {{ currentBoard.description }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <BaseButton variant="outline" size="sm"> Settings </BaseButton>
            <BaseButton size="sm"> Add Card </BaseButton>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-6">
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

      <div v-else-if="currentBoard" class="space-y-6">
        <!-- Board Stats -->
        <div class="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{{ boardColumns.length }} columns</span>
          <span>{{ totalCards }} cards</span>
        </div>

        <!-- Kanban Columns -->
        <div class="flex gap-4 overflow-x-auto pb-4">
          <div v-for="column in boardColumns" :key="column.id" class="flex-shrink-0 w-80">
            <div class="bg-card border rounded-lg p-4">
              <!-- Column Header -->
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-foreground">{{ column.title }}</h3>
                <span class="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                  {{ column.cards.length }}
                </span>
              </div>

              <!-- Column Cards -->
              <div class="space-y-3">
                <div
                  v-for="card in column.cards"
                  :key="card.id"
                  class="bg-background border rounded-md p-3 cursor-pointer hover:shadow-md transition-shadow"
                  @click="openCard(card)"
                >
                  <h4 class="font-medium text-foreground mb-2">{{ card.title }}</h4>
                  <p
                    v-if="card.description"
                    class="text-sm text-muted-foreground mb-3 line-clamp-2"
                  >
                    {{ card.description }}
                  </p>

                  <!-- Card Meta -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span
                        :class="priorityClasses[card.priority]"
                        class="text-xs px-2 py-1 rounded-full"
                      >
                        {{ card.priority }}
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

                <!-- Add Card Button -->
                <BaseButton
                  variant="ghost"
                  size="sm"
                  class="w-full justify-start text-muted-foreground hover:text-foreground"
                  @click="addCardToColumn(column.id)"
                >
                  + Add Card
                </BaseButton>
              </div>
            </div>
          </div>

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
import { useKanbanStore } from '@/stores/kanban'
import BaseButton from '@/components/ui/Button.vue'
import type { Card } from '@/types'

const kanbanStore = useKanbanStore()

const { currentBoard, boardColumns, totalCards, isLoading, error, fetchBoard } = kanbanStore

const priorityClasses = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
}

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

onMounted(() => {
  fetchBoard('1')
})
</script>
