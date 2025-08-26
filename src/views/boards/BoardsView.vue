<template>
  <div class="h-full bg-background relative overflow-hidden group rounded-lg">
    <!-- Interactive Grid Pattern Background -->
    <InteractiveGridPattern :width="20" :height="20" :squares="[100, 100]" class="opacity-20" />

    <div class="container mx-auto px-4 py-8 relative z-10">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-foreground mb-2">Boards</h1>
          <div class="flex items-center space-x-3">
            <InteractiveButton size="sm" @click="openCreateModal">
              <IconPlus class="h-4 w-4 mr-2" />
              New
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
        @create="openCreateModal"
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
            @delete="handleDeleteBoard"
          />
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :is-open="showDeleteModal"
      title="Delete Board"
      :message="`Are you sure you want to delete '${boardToDelete?.title}'?`"
      description="This action cannot be undone. All cards, columns, and board data will be permanently removed."
      confirm-text="Delete Board"
      :is-loading="isDeletingBoard"
      @close="closeDeleteModal"
      @confirm="confirmDeleteBoard"
    />

    <!-- Create Board Modal -->
    <CreateBoardModal
      :is-open="showCreateModal"
      :is-loading="isCreatingBoard"
      @close="closeCreateModal"
      @create="handleCreateBoard"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBoards } from '@/composables/useBoards'
import { BoardCard, EmptyState, CreateBoardModal } from '@/components/boards'
import { ConfirmModal } from '@/components/ui'
import InteractiveButton from '@/components/ui/InteractiveButton.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconX from '@/components/icons/IconX.vue'
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern'
import type { Board } from '@/types'

// Use the boards composable
const {
  boards,
  isLoading,
  hasBoards,
  isCreatingBoard,
  error,
  createNewBoard,
  deleteBoard,
  navigateToBoard,
  clearError,
} = useBoards()

// Delete modal state
const showDeleteModal = ref(false)
const boardToDelete = ref<Board | null>(null)
const isDeletingBoard = ref(false)

// Create modal state
const showCreateModal = ref(false)

// Handle board actions
const handleDeleteBoard = (boardId: string) => {
  const board = boards.value.find((b) => b.id === boardId)
  if (board) {
    boardToDelete.value = board
    showDeleteModal.value = true
  }
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  boardToDelete.value = null
}

const confirmDeleteBoard = async () => {
  if (!boardToDelete.value) return

  isDeletingBoard.value = true
  try {
    await deleteBoard(boardToDelete.value.id)
    closeDeleteModal()
  } catch (err) {
    // Error is already handled in the composable
    console.error('Failed to delete board:', err)
  } finally {
    isDeletingBoard.value = false
  }
}

// Create board methods
const openCreateModal = () => {
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const handleCreateBoard = async (boardName: string) => {
  try {
    await createNewBoard(boardName)
    closeCreateModal()
  } catch (err) {
    // Error is already handled in the composable
    console.error('Failed to create board:', err)
  }
}
</script>
