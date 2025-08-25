import type { Board } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { boardService } from '@/lib/services'

export const useBoardStore = defineStore('board', () => {
  // State
  const boards = ref<Board[]>([])
  const currentBoard = ref<Board | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const boardColumns = computed(() => currentBoard.value?.columns || [])
  const totalCards = computed(() =>
    boardColumns.value.reduce((total, column) => total + column.cards.length, 0),
  )

  // Actions
  const setLoading = (loading: boolean, errorMessage: string | null = null) => {
    isLoading.value = loading
    error.value = errorMessage
  }

  const fetchBoard = async (boardId: string) => {
    setLoading(true)
    try {
      const board = await boardService.getBoard(boardId)
      if (board) {
        currentBoard.value = board
      } else {
        setLoading(false, 'Board not found')
      }
    } catch (err) {
      setLoading(false, 'Failed to fetch board')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createBoard = async (boardData: Omit<Board, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true)
    try {
      const newBoard = await boardService.createBoard(boardData)
      // Set the current board immediately after creation
      currentBoard.value = newBoard
      // Refresh boards list to get the updated summary
      const boardsData = await boardService.getBoards()
      boards.value = boardsData
      return newBoard
    } catch (err) {
      setLoading(false, 'Failed to create board')
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const refreshBoards = async () => {
    setLoading(true)
    try {
      const boardsData = await boardService.getBoards()
      boards.value = boardsData
    } catch (err) {
      setLoading(false, 'Failed to refresh boards')
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const initializeBoards = async () => {
    try {
      const boardsData = await boardService.getBoards()
      boards.value = boardsData
    } catch (error) {
      console.error('Failed to initialize boards:', error)
    }
  }

  const setCurrentBoard = (board: Board | null) => {
    currentBoard.value = board
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    boards,
    currentBoard,
    isLoading,
    error,

    // Getters
    boardColumns,
    totalCards,

    // Actions
    setLoading,
    fetchBoard,
    createBoard,
    refreshBoards,
    initializeBoards,
    setCurrentBoard,
    clearError,
  }
})
