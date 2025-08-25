import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBoardStore, useUserStore } from '@/stores'
import type { Board, User } from '@/types'

export function useBoards() {
  const router = useRouter()
  const boardStore = useBoardStore()
  const userStore = useUserStore()

  // State
  const isCreatingBoard = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const boards = computed(() => boardStore.boards)
  const isLoading = computed(() => boardStore.isLoading)
  const hasBoards = computed(() => boards.value.length > 0)
  const currentUser = computed(() => userStore.currentUser)

  // Methods
  const getTotalCards = (board: Board): number => {
    return board.columns.reduce((total, column) => total + column.cards.length, 0)
  }

  const navigateToBoard = (boardId: string) => {
    router.push({ name: 'board', params: { id: boardId } })
  }

  const createDefaultUser = async (): Promise<string> => {
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
    return defaultUser.id
  }

  const createNewBoard = async () => {
    if (isCreatingBoard.value) return

    isCreatingBoard.value = true
    error.value = null

    try {
      // Ensure we have a user
      let userId = currentUser.value?.id
      if (!userId) {
        userId = await createDefaultUser()
      }

      const newBoard = await boardStore.createBoard({
        title: 'New Board',
        description: 'A new Kanban board',
        ownerId: userId,
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
            userId,
            role: 'owner',
            joinedAt: new Date(),
          },
        ],
      })

      router.push({ name: 'board', params: { id: newBoard.id } })
    } catch (err) {
      error.value = 'Failed to create board. Please try again.'
      console.error('Failed to create board:', err)
    } finally {
      isCreatingBoard.value = false
    }
  }

  const refreshBoards = async () => {
    try {
      await boardStore.refreshBoards()
    } catch (err) {
      error.value = 'Failed to refresh boards'
      console.error('Failed to refresh boards:', err)
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    isCreatingBoard,
    error,

    // Computed
    boards,
    isLoading,
    hasBoards,
    currentUser,

    // Methods
    getTotalCards,
    navigateToBoard,
    createNewBoard,
    refreshBoards,
    clearError,
  }
}
