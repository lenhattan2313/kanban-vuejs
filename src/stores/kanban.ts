import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Board, Column, Card, Priority } from '@/types'

export const useKanbanStore = defineStore('kanban', () => {
  // State
  const boards = ref<Board[]>([])
  const currentBoard = ref<Board | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Mock data for development
  const mockBoard: Board = {
    id: '1',
    title: 'My Kanban Board',
    description: 'A sample Kanban board for development',
    ownerId: 'user1',
    isPublic: true,
    columns: [
      {
        id: 'col1',
        title: 'To Do',
        position: 0,
        boardId: '1',
        cards: [
          {
            id: 'card1',
            title: 'Design UI Components',
            description: 'Create reusable UI components using Shadcn UI',
            priority: 'high',
            tags: ['design', 'ui'],
            position: 0,
            columnId: 'col1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'card2',
            title: 'Setup Project Structure',
            description: 'Organize project folders and files',
            priority: 'medium',
            tags: ['setup'],
            position: 1,
            columnId: 'col1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'col2',
        title: 'In Progress',
        position: 1,
        boardId: '1',
        cards: [
          {
            id: 'card3',
            title: 'Implement Drag & Drop',
            description: 'Add drag and drop functionality for cards',
            priority: 'high',
            tags: ['feature', 'drag-drop'],
            position: 0,
            columnId: 'col2',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'col3',
        title: 'Done',
        position: 2,
        boardId: '1',
        cards: [
          {
            id: 'card4',
            title: 'Project Setup',
            description: 'Initial project setup with Vue.js and TypeScript',
            priority: 'low',
            tags: ['setup', 'complete'],
            position: 0,
            columnId: 'col3',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    settings: {
      theme: 'auto',
      allowComments: true,
      allowAttachments: true,
      autoArchive: false,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Initialize with mock data
  boards.value = [mockBoard]
  currentBoard.value = mockBoard

  // Getters
  const boardColumns = computed(() => currentBoard.value?.columns || [])

  const totalCards = computed(() =>
    boardColumns.value.reduce((total, column) => total + column.cards.length, 0),
  )

  // Actions
  const fetchBoard = async (boardId: string) => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      const board = boards.value.find((b) => b.id === boardId)
      if (board) {
        currentBoard.value = board
      } else {
        error.value = 'Board not found'
      }
    } catch (err) {
      error.value = 'Failed to fetch board'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const addCard = (columnId: string, card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!currentBoard.value) return

    const newCard: Card = {
      ...card,
      id: `card-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const column = currentBoard.value.columns.find((col) => col.id === columnId)
    if (column) {
      column.cards.push(newCard)
    }
  }

  const updateCard = (cardId: string, updates: Partial<Card>) => {
    if (!currentBoard.value) return

    for (const column of currentBoard.value.columns) {
      const cardIndex = column.cards.findIndex((card) => card.id === cardId)
      if (cardIndex !== -1) {
        column.cards[cardIndex] = {
          ...column.cards[cardIndex],
          ...updates,
          updatedAt: new Date(),
        }
        break
      }
    }
  }

  const deleteCard = (cardId: string) => {
    if (!currentBoard.value) return

    for (const column of currentBoard.value.columns) {
      const cardIndex = column.cards.findIndex((card) => card.id === cardId)
      if (cardIndex !== -1) {
        column.cards.splice(cardIndex, 1)
        break
      }
    }
  }

  const moveCard = (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    newPosition: number,
  ) => {
    if (!currentBoard.value) return

    const fromColumn = currentBoard.value.columns.find((col) => col.id === fromColumnId)
    const toColumn = currentBoard.value.columns.find((col) => col.id === toColumnId)

    if (fromColumn && toColumn) {
      const cardIndex = fromColumn.cards.findIndex((card) => card.id === cardId)
      if (cardIndex !== -1) {
        const [card] = fromColumn.cards.splice(cardIndex, 1)
        card.columnId = toColumnId
        card.position = newPosition
        card.updatedAt = new Date()
        toColumn.cards.splice(newPosition, 0, card)
      }
    }
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
    fetchBoard,
    addCard,
    updateCard,
    deleteCard,
    moveCard,
  }
})
