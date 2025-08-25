<template>
  <div class="h-full bg-background relative overflow-hidden group rounded-lg">
    <!-- Interactive Grid Pattern Background -->
    <InteractiveGridPattern :width="20" :height="20" :squares="[100, 100]" class="opacity-20" />

    <div class="container mx-auto px-4 py-8 relative z-10">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-foreground mb-2">My Boards</h1>
            <p class="text-muted-foreground">Manage your Kanban boards</p>
          </div>
          <div class="flex items-center space-x-3">
            <InteractiveButton :loading="isCreatingBoard" size="sm" @click="createNewBoard">
              <IconPlus class="h-4 w-4 mr-2" />
              New Board
            </InteractiveButton>
          </div>
        </div>
      </header>

      <!-- Error Alert -->
      <div v-if="error" class="mb-6">
        <div class="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <p class="text-destructive text-sm">{{ error }}</p>
            <button
              @click="clearError"
              class="text-destructive hover:text-destructive/80 transition-colors"
              aria-label="Dismiss error"
            >
              <IconX class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading && !hasBoards" class="flex items-center justify-center py-16">
        <div class="text-center">
          <LoadingSpinner size="lg" class="mb-4" />
          <p class="text-muted-foreground">Loading your boards...</p>
        </div>
      </div>

      <!-- Empty State -->
      <EmptyState
        v-else-if="!isLoading && !hasBoards"
        :is-loading="isCreatingBoard"
        @create="createNewBoard"
      />

      <!-- Boards Grid -->
      <div v-else-if="hasBoards" class="space-y-6">
        <!-- Recent Boards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <BoardCard
            v-for="board in boards"
            :key="board.id"
            :board="board"
            @click="navigateToBoard"
            @edit="handleEditBoard"
            @delete="handleDeleteBoard"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoards } from '@/composables/useBoards'
import { BoardCard, EmptyState } from '@/components/boards'
import InteractiveButton from '@/components/ui/InteractiveButton.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconX from '@/components/icons/IconX.vue'
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern'

// Use the boards composable
const {
  boards,
  isLoading,
  hasBoards,
  isCreatingBoard,
  error,
  createNewBoard,
  navigateToBoard,
  clearError,
} = useBoards()

// Handle board actions
const handleEditBoard = (boardId: string) => {
  // TODO: Implement edit board functionality
  console.log('Edit board:', boardId)
}

const handleDeleteBoard = (boardId: string) => {
  // TODO: Implement delete board functionality
  console.log('Delete board:', boardId)
}
</script>
