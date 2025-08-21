import type { Board, Card, DragItem, DropResult, LoadingState, User } from '@/types'
import { STORAGE_KEYS } from '@/utils/constants'
import { validateCard } from '@/utils/validation'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useKanbanStore = defineStore('kanban', () => {
  // State
  const boards = ref<Board[]>([])
  const currentBoard = ref<Board | null>(null)
  const currentUser = ref<User | null>(null)
  const loadingState = ref<LoadingState>({
    isLoading: false,
    error: null,
  })
  const dragState = ref<{
    isDragging: boolean
    dragItem: DragItem | null
  }>({
    isDragging: false,
    dragItem: null,
  })

  // Mock data for development
  const mockBoard: Board = {
    id: '1',
    title: 'My Kanban Board',
    description: 'A sample Kanban board for development',
    ownerId: 'user1',
    isPublic: true,
    members: [
      {
        userId: 'user1',
        role: 'owner',
        joinedAt: new Date(),
      },
    ],
    columns: [
      {
        id: 'col1',
        title: 'To Do',
        description: 'Tasks that need to be started',
        position: 0,
        boardId: '1',
        isArchived: false,
        cards: [
          {
            id: 'card1',
            title: 'Design UI Components',
            description: 'Create reusable UI components using Shadcn UI',
            priority: 'high',
            tags: ['design', 'ui'],
            position: 0,
            columnId: 'col1',
            attachments: [],
            comments: [],
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
            attachments: [],
            comments: [],
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
        description: 'Tasks currently being worked on',
        position: 1,
        boardId: '1',
        isArchived: false,
        cards: [
          {
            id: 'card3',
            title: 'Implement Drag & Drop',
            description: 'Add drag and drop functionality for cards',
            priority: 'high',
            tags: ['feature', 'drag-drop'],
            position: 0,
            columnId: 'col2',
            attachments: [],
            comments: [],
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
        description: 'Completed tasks',
        position: 2,
        boardId: '1',
        isArchived: false,
        cards: [
          {
            id: 'card4',
            title: 'Project Setup',
            description: 'Initial project setup with Vue.js and TypeScript',
            priority: 'low',
            tags: ['setup', 'complete'],
            position: 0,
            columnId: 'col3',
            attachments: [],
            comments: [],
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
      workflowRules: [],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Mock user for development
  const mockUser: User = {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
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

  // Initialize with mock data
  boards.value = [mockBoard]
  currentBoard.value = mockBoard
  currentUser.value = mockUser

  // Getters
  const boardColumns = computed(() => currentBoard.value?.columns || [])

  const totalCards = computed(() =>
    boardColumns.value.reduce((total, column) => total + column.cards.length, 0),
  )

  const isLoading = computed(() => loadingState.value.isLoading)
  const error = computed(() => loadingState.value.error)

  const userCanEdit = computed(() => {
    if (!currentUser.value || !currentBoard.value) return false
    const member = currentBoard.value.members.find((m) => m.userId === currentUser.value?.id)
    return member?.role === 'owner' || member?.role === 'admin' || member?.role === 'member'
  })

  const userCanView = computed(() => {
    if (!currentUser.value || !currentBoard.value) return false
    if (currentBoard.value.isPublic) return true
    const member = currentBoard.value.members.find((m) => m.userId === currentUser.value?.id)
    return !!member
  })

  // Actions
  const setLoading = (isLoading: boolean, error: string | null = null) => {
    loadingState.value = {
      isLoading,
      error,
      lastUpdated: isLoading ? undefined : new Date(),
    }
  }

  const fetchBoard = async (boardId: string) => {
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      const board = boards.value.find((b) => b.id === boardId)
      if (board) {
        currentBoard.value = board
        // Save to recent boards
        saveRecentBoard(boardId)
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

  const addCard = (
    columnId: string,
    cardData: Omit<Card, 'id' | 'createdAt' | 'updatedAt' | 'attachments' | 'comments'>,
  ) => {
    if (!currentBoard.value) return false

    // Validate card data
    const validation = validateCard(cardData)
    if (!validation.isValid) {
      console.error('Card validation failed:', validation.errors)
      return false
    }

    const newCard: Card = {
      ...cardData,
      id: `card-${Date.now()}`,
      attachments: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const column = currentBoard.value.columns.find((col) => col.id === columnId)
    if (column) {
      column.cards.push(newCard)
      return true
    }
    return false
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
  ): boolean => {
    if (!currentBoard.value) return false

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
        return true
      }
    }
    return false
  }

  // Drag and Drop Actions
  const startDrag = (dragItem: DragItem) => {
    dragState.value = {
      isDragging: true,
      dragItem,
    }
  }

  const endDrag = () => {
    dragState.value = {
      isDragging: false,
      dragItem: null,
    }
  }

  const handleDrop = (dropResult: DropResult): boolean => {
    if (!dragState.value.dragItem) return false

    const { dragItem } = dragState.value

    if (dragItem.type === 'card' && dropResult.type === 'card') {
      return moveCard(
        dragItem.id,
        dragItem.sourceColumnId!,
        dropResult.targetColumnId!,
        dropResult.targetIndex!,
      )
    }

    endDrag()
    return false
  }

  // Utility Actions
  const saveRecentBoard = (boardId: string) => {
    try {
      const recentBoards = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT_BOARDS) || '[]')
      const updatedBoards = [boardId, ...recentBoards.filter((id: string) => id !== boardId)].slice(
        0,
        5,
      )
      localStorage.setItem(STORAGE_KEYS.RECENT_BOARDS, JSON.stringify(updatedBoards))
    } catch (error) {
      console.error('Failed to save recent board:', error)
    }
  }

  const getRecentBoards = (): string[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT_BOARDS) || '[]')
    } catch (error) {
      console.error('Failed to get recent boards:', error)
      return []
    }
  }

  return {
    // State
    boards,
    currentBoard,
    currentUser,
    loadingState,
    dragState,

    // Getters
    boardColumns,
    totalCards,
    isLoading,
    error,
    userCanEdit,
    userCanView,

    // Actions
    setLoading,
    fetchBoard,
    addCard,
    updateCard,
    deleteCard,
    moveCard,
    startDrag,
    endDrag,
    handleDrop,
    saveRecentBoard,
    getRecentBoards,
  }
})
