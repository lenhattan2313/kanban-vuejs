import type { Card, Column } from '@/types'
import { validateCard } from '@/utils/validation'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { cardService } from '@/lib/services'
import { useBoardStore } from './board'

export const useCardStore = defineStore('card', () => {
  const boardStore = useBoardStore()

  // Getters
  const currentBoard = computed(() => boardStore.currentBoard)
  const boardColumns = computed(() => boardStore.boardColumns)

  // Actions
  const addCard = async (
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

    try {
      const newCard = await cardService.createCard({
        ...cardData,
        attachments: [],
        comments: [],
      })

      // Update local state
      const column = currentBoard.value.columns.find((col) => col.id === columnId)
      if (column) {
        column.cards.push(newCard)
      }

      return true
    } catch (error) {
      console.error('Failed to create card:', error)
      return false
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

        // Update positions for both columns
        fromColumn.cards.forEach((c, index) => {
          c.position = index
        })
        toColumn.cards.forEach((c, index) => {
          c.position = index
        })

        return true
      }
    }
    return false
  }

  const reorderCardsInColumn = (columnId: string, cardIds: string[]): boolean => {
    if (!currentBoard.value) return false

    const column = currentBoard.value.columns.find((col) => col.id === columnId)
    if (!column) return false

    // Create a map of current cards
    const cardMap = new Map(column.cards.map((card) => [card.id, card]))

    // Reorder cards based on the provided order
    const reorderedCards: Card[] = []
    for (const cardId of cardIds) {
      const card = cardMap.get(cardId)
      if (card) {
        reorderedCards.push(card)
      }
    }

    // Update positions and replace cards
    reorderedCards.forEach((card, index) => {
      card.position = index
    })
    column.cards = reorderedCards

    return true
  }

  const getCardById = (cardId: string): Card | null => {
    if (!currentBoard.value) return null

    for (const column of currentBoard.value.columns) {
      const card = column.cards.find((card) => card.id === cardId)
      if (card) return card
    }
    return null
  }

  const getCardsByColumn = (columnId: string): Card[] => {
    if (!currentBoard.value) return []

    const column = currentBoard.value.columns.find((col) => col.id === columnId)
    return column?.cards || []
  }

  return {
    // Actions
    addCard,
    updateCard,
    deleteCard,
    moveCard,
    reorderCardsInColumn,
    getCardById,
    getCardsByColumn,
  }
})
