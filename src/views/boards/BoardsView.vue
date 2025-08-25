<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-foreground mb-2">My Boards</h1>
            <p class="text-muted-foreground">Manage your Kanban boards</p>
          </div>
          <div class="flex items-center gap-3">
            <Button variant="outline" size="sm" @click="importBoard">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Import
            </Button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Recent Boards -->
        <div
          v-for="board in recentBoards"
          :key="board.id"
          class="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
          @click="navigateToBoard(board.id)"
        >
          <h3 class="font-semibold text-foreground mb-2">{{ board.title }}</h3>
          <p v-if="board.description" class="text-sm text-muted-foreground mb-4 line-clamp-2">
            {{ board.description }}
          </p>
          <div class="flex items-center justify-between text-sm text-muted-foreground">
            <span>{{ board.columns.length }} columns</span>
            <span>{{ getTotalCards(board) }} cards</span>
          </div>
        </div>

        <!-- Create New Board -->
        <div
          class="bg-card border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center"
          @click="createNewBoard"
        >
          <div class="text-center">
            <IconPlus class="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p class="text-muted-foreground">Create New Board</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useKanbanStore } from '@/stores/kanban'
import IconPlus from '@/components/icons/IconPlus.vue'
import Button from '@/components/ui/Button.vue'
import type { Board } from '@/types'

const router = useRouter()
const kanbanStore = useKanbanStore()

const recentBoards = computed(() => kanbanStore.boards)

const getTotalCards = (board: Board): number => {
  return board.columns.reduce((total, column) => total + column.cards.length, 0)
}

const navigateToBoard = (boardId: string) => {
  router.push({ name: 'board', params: { id: boardId } })
}

const createNewBoard = () => {
  // TODO: Implement create board functionality
  console.log('Create new board')
}

const importBoard = () => {
  console.log('Importing board')
  // TODO: Open import board modal
}
</script>
