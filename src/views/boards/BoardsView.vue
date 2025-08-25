<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-foreground mb-2">My Boards</h1>
            <p class="text-muted-foreground">Manage your Kanban boards</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div
            class="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"
          ></div>
          <p class="text-muted-foreground">Loading boards...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="recentBoards.length === 0" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div
            class="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <IconPlus class="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-2">No boards yet</h3>
          <p class="text-muted-foreground mb-6">Create your first Kanban board to get started</p>
          <Button @click="createNewBoard" class="px-6">
            <IconPlus class="h-4 w-4 mr-2" />
            Create Your First Board
          </Button>
        </div>
      </div>

      <!-- Boards Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
import { useBoardStore, useUserStore, useUIStore } from '@/stores'
import IconPlus from '@/components/icons/IconPlus.vue'
import Button from '@/components/ui/Button.vue'
import type { Board, User } from '@/types'

const router = useRouter()
const boardStore = useBoardStore()
const userStore = useUserStore()
const uiStore = useUIStore()

const recentBoards = computed(() => boardStore.boards)
const isLoading = computed(() => uiStore.isGlobalLoading)

const getTotalCards = (board: Board): number => {
  return board.columns.reduce((total, column) => total + column.cards.length, 0)
}

const navigateToBoard = (boardId: string) => {
  router.push({ name: 'board', params: { id: boardId } })
}

const createNewBoard = async () => {
  try {
    // Create a default user if none exists
    let userId = userStore.currentUser?.id
    if (!userId) {
      const defaultUser: User = {
        id: 'user_1',
        name: 'User',
        email: 'user@example.com',
        role: 'admin',
        preferences: {
          theme: 'auto',
          language: 'en',
          notifications: {
            email: true,
            push: true,
            mentions: true,
            dueDateReminders: true,
          },
          boardView: 'kanban',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      await userStore.createUser(defaultUser)
      userId = defaultUser.id
    }

    const newBoard = await boardStore.createBoard({
      title: 'New Board',
      description: 'A new Kanban board',
      ownerId: userId!,
      isPublic: true,
      columns: [],
      settings: {
        theme: 'auto',
        allowComments: true,
        allowAttachments: true,
        autoArchive: false,
        workflowRules: [],
      },
      members: [
        {
          userId: userId!,
          role: 'owner',
          joinedAt: new Date(),
        },
      ],
    })
    router.push({ name: 'board', params: { id: newBoard.id } })
  } catch (error) {
    console.error('Failed to create board:', error)
  }
}
</script>
