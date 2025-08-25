import type { Card } from '@/types'

export interface CardService {
  getCards(boardId: string): Promise<Card[]>
  getCard(id: string): Promise<Card | null>
  createCard(card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card>
  updateCard(id: string, updates: Partial<Card>): Promise<Card>
  deleteCard(id: string): Promise<boolean>
  moveCard(
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    newPosition: number,
  ): Promise<boolean>
}

class LocalStorageCardService implements CardService {
  private getStorageKey(key: string): string {
    return `kanban_cards_${key}`
  }

  private async delay(ms: number = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async getCards(boardId: string): Promise<Card[]> {
    await this.delay()
    try {
      const cardsJson = localStorage.getItem(this.getStorageKey(boardId))
      if (!cardsJson) {
        return []
      }
      const cards: Card[] = JSON.parse(cardsJson)
      return cards.map((card: Card) => ({
        ...card,
        createdAt: new Date(card.createdAt),
        updatedAt: new Date(card.updatedAt),
      }))
    } catch (error) {
      console.error('Error loading cards:', error)
      return []
    }
  }

  async getCard(id: string): Promise<Card | null> {
    await this.delay()
    try {
      // Search through all board card storage
      const keys = Object.keys(localStorage).filter((key) => key.startsWith('kanban_cards_'))

      for (const key of keys) {
        const cardsJson = localStorage.getItem(key)
        if (cardsJson) {
          const cards = JSON.parse(cardsJson)
          const card = cards.find((c: Card) => c.id === id)
          if (card) {
            return {
              ...card,
              createdAt: new Date(card.createdAt),
              updatedAt: new Date(card.updatedAt),
            } as Card
          }
        }
      }
      return null
    } catch (error) {
      console.error('Error loading card:', error)
      return null
    }
  }

  async createCard(cardData: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card> {
    await this.delay()
    try {
      const newCard: Card = {
        ...cardData,
        id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const cards = await this.getCards(cardData.columnId.split('_')[0]) // Extract boardId from columnId
      cards.push(newCard)
      await this.saveCards(cardData.columnId.split('_')[0], cards)

      return newCard
    } catch (error) {
      console.error('Error creating card:', error)
      throw error
    }
  }

  async updateCard(id: string, updates: Partial<Card>): Promise<Card> {
    await this.delay()
    try {
      const keys = Object.keys(localStorage).filter((key) => key.startsWith('kanban_cards_'))

      for (const key of keys) {
        const cardsJson = localStorage.getItem(key)
        if (cardsJson) {
          const cards = JSON.parse(cardsJson)
          const cardIndex = cards.findIndex((c: Card) => c.id === id)

          if (cardIndex !== -1) {
            const updatedCard = {
              ...cards[cardIndex],
              ...updates,
              updatedAt: new Date(),
            }

            cards[cardIndex] = updatedCard
            const boardId = key.replace('kanban_cards_', '')
            await this.saveCards(boardId, cards)

            return {
              ...updatedCard,
              createdAt: new Date(updatedCard.createdAt),
              updatedAt: new Date(updatedCard.updatedAt),
            } as Card
          }
        }
      }

      throw new Error('Card not found')
    } catch (error) {
      console.error('Error updating card:', error)
      throw error
    }
  }

  async deleteCard(id: string): Promise<boolean> {
    await this.delay()
    try {
      const keys = Object.keys(localStorage).filter((key) => key.startsWith('kanban_cards_'))

      for (const key of keys) {
        const cardsJson = localStorage.getItem(key)
        if (cardsJson) {
          const cards = JSON.parse(cardsJson)
          const cardIndex = cards.findIndex((c: Card) => c.id === id)

          if (cardIndex !== -1) {
            cards.splice(cardIndex, 1)
            const boardId = key.replace('kanban_cards_', '')
            await this.saveCards(boardId, cards)
            return true
          }
        }
      }

      return false
    } catch (error) {
      console.error('Error deleting card:', error)
      return false
    }
  }

  async moveCard(
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    newPosition: number,
  ): Promise<boolean> {
    await this.delay()
    try {
      // Remove from source column
      const fromBoardId = fromColumnId.split('_')[0]
      const fromCards = await this.getCards(fromBoardId)
      const cardIndex = fromCards.findIndex((card) => card.id === cardId)

      if (cardIndex === -1) {
        return false
      }

      const [card] = fromCards.splice(cardIndex, 1)
      await this.saveCards(fromBoardId, fromCards)

      // Add to target column
      const toBoardId = toColumnId.split('_')[0]
      const toCards = await this.getCards(toBoardId)

      card.columnId = toColumnId
      card.position = newPosition
      card.updatedAt = new Date()

      toCards.splice(newPosition, 0, card)
      await this.saveCards(toBoardId, toCards)

      return true
    } catch (error) {
      console.error('Error moving card:', error)
      return false
    }
  }

  private async saveCards(boardId: string, cards: Card[]): Promise<void> {
    localStorage.setItem(this.getStorageKey(boardId), JSON.stringify(cards))
  }
}

export const cardService: CardService = new LocalStorageCardService()
