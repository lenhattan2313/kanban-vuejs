import { defineStore } from 'pinia'
import { useBoardStore } from './board'
import { useUserStore } from './user'
import { useLocalStorageStore } from './localStorage'

export const useAppStore = defineStore('app', () => {
  const boardStore = useBoardStore()
  const userStore = useUserStore()
  const localStorageStore = useLocalStorageStore()

  // Initialize all stores
  const initializeApp = async () => {
    try {
      // Initialize user and boards in parallel
      await Promise.all([userStore.initializeUser(), boardStore.initializeBoards()])
    } catch (error) {
      console.error('Failed to initialize app:', error)
    }
  }

  // Reset all stores (useful for logout)
  const resetApp = () => {
    boardStore.setCurrentBoard(null)
    userStore.setCurrentUser(null)
    boardStore.clearError()
    userStore.clearError()
  }

  // Get recent boards with board data
  const getRecentBoardsWithData = () => {
    const recentBoardIds = localStorageStore.getRecentBoards()
    return boardStore.boards.filter((board) => recentBoardIds.includes(board.id))
  }

  // Save current board to recent boards
  const saveCurrentBoardToRecent = () => {
    if (boardStore.currentBoard) {
      localStorageStore.saveRecentBoard(boardStore.currentBoard.id)
    }
  }

  return {
    // Initialization
    initializeApp,
    resetApp,

    // Recent boards
    getRecentBoardsWithData,
    saveCurrentBoardToRecent,

    // Store access
    boardStore,
    userStore,
    localStorageStore,
  }
})
