import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useBoardStore } from './board'
import { useUserStore } from './user'

export const useUIStore = defineStore('ui', () => {
  const boardStore = useBoardStore()
  const userStore = useUserStore()

  // Getters for permissions
  const userCanEdit = computed(() => {
    const currentUser = userStore.currentUser
    const currentBoard = boardStore.currentBoard

    if (!currentUser || !currentBoard) return false

    const member = currentBoard.members.find((m) => m.userId === currentUser?.id)
    return member?.role === 'owner' || member?.role === 'admin' || member?.role === 'member'
  })

  const userCanView = computed(() => {
    const currentUser = userStore.currentUser
    const currentBoard = boardStore.currentBoard

    if (!currentUser || !currentBoard) return false

    if (currentBoard.isPublic) return true

    const member = currentBoard.members.find((m) => m.userId === currentUser?.id)
    return !!member
  })

  const userCanDelete = computed(() => {
    const currentUser = userStore.currentUser
    const currentBoard = boardStore.currentBoard

    if (!currentUser || !currentBoard) return false

    const member = currentBoard.members.find((m) => m.userId === currentUser?.id)
    return member?.role === 'owner' || member?.role === 'admin'
  })

  const userCanManageMembers = computed(() => {
    const currentUser = userStore.currentUser
    const currentBoard = boardStore.currentBoard

    if (!currentUser || !currentBoard) return false

    const member = currentBoard.members.find((m) => m.userId === currentUser?.id)
    return member?.role === 'owner' || member?.role === 'admin'
  })

  const isBoardOwner = computed(() => {
    const currentUser = userStore.currentUser
    const currentBoard = boardStore.currentBoard

    if (!currentUser || !currentBoard) return false

    return currentBoard.ownerId === currentUser.id
  })

  // Global loading state
  const isGlobalLoading = computed(() => {
    return boardStore.isLoading || userStore.isLoading
  })

  // Global error state
  const globalError = computed(() => {
    return boardStore.error || userStore.error
  })

  // Helper functions
  const hasPermission = (permission: 'view' | 'edit' | 'delete' | 'manage_members'): boolean => {
    switch (permission) {
      case 'view':
        return userCanView.value
      case 'edit':
        return userCanEdit.value
      case 'delete':
        return userCanDelete.value
      case 'manage_members':
        return userCanManageMembers.value
      default:
        return false
    }
  }

  const getUserRole = (): string | null => {
    const currentUser = userStore.currentUser
    const currentBoard = boardStore.currentBoard

    if (!currentUser || !currentBoard) return null

    if (currentBoard.ownerId === currentUser.id) return 'owner'

    const member = currentBoard.members.find((m) => m.userId === currentUser.id)
    return member?.role || null
  }

  return {
    // Permission getters
    userCanEdit,
    userCanView,
    userCanDelete,
    userCanManageMembers,
    isBoardOwner,

    // Global state getters
    isGlobalLoading,
    globalError,

    // Helper functions
    hasPermission,
    getUserRole,
  }
})
