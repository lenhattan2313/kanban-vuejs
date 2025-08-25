import type { Board, Card, Column, User } from '@/types'

// Service interface for easy switching between localStorage and API
interface DataService {
  getBoards(): Promise<Board[]>
  getBoard(id: string): Promise<Board | null>
  createBoard(board: Omit<Board, 'id' | 'createdAt' | 'updatedAt'>): Promise<Board>
  updateBoard(id: string, updates: Partial<Board>): Promise<Board>
  deleteBoard(id: string): Promise<boolean>

  getCards(boardId: string): Promise<Card[]>
  getCard(id: string): Promise<Card | null>
  createCard(card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card>
  updateCard(id: string, updates: Partial<Card>): Promise<Card>
  deleteCard(id: string): Promise<boolean>

  getColumns(boardId: string): Promise<Column[]>
  getColumn(id: string): Promise<Column | null>
  createColumn(column: Omit<Column, 'id' | 'createdAt' | 'updatedAt'>): Promise<Column>
  updateColumn(id: string, updates: Partial<Column>): Promise<Column>
  deleteColumn(id: string): Promise<boolean>

  getUser(): Promise<User | null>
  updateUser(updates: Partial<User>): Promise<User>
}

// LocalStorage implementation
class LocalStorageService implements DataService {
  private getStorageKey(key: string): string {
    return `kanban_${key}`
  }

  private async delay(ms: number = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Board operations
  async getBoards(): Promise<Board[]> {
    await this.delay()
    try {
      const boardsJson = localStorage.getItem(this.getStorageKey('boards'))
      if (!boardsJson) {
        // Return empty array if no boards exist
        return []
      }
      const boards = JSON.parse(boardsJson)
      return boards.map((board: Record<string, unknown>) => ({
        ...board,
        createdAt: new Date(board.createdAt as string),
        updatedAt: new Date(board.updatedAt as string),
        columns: (board.columns as Record<string, unknown>[]).map(
          (col: Record<string, unknown>) => ({
            ...col,
            createdAt: new Date(col.createdAt as string),
            updatedAt: new Date(col.updatedAt as string),
            cards: (col.cards as Record<string, unknown>[]).map(
              (card: Record<string, unknown>) => ({
                ...card,
                createdAt: new Date(card.createdAt as string),
                updatedAt: new Date(card.updatedAt as string),
              }),
            ),
          }),
        ),
      }))
    } catch (error) {
      console.error('Error loading boards:', error)
      return []
    }
  }

  async getBoard(id: string): Promise<Board | null> {
    await this.delay()
    const boards = await this.getBoards()
    return boards.find((board) => board.id === id) || null
  }

  async createBoard(boardData: Omit<Board, 'id' | 'createdAt' | 'updatedAt'>): Promise<Board> {
    await this.delay()
    const boards = await this.getBoards()
    const newBoard: Board = {
      ...boardData,
      id: `board_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    boards.push(newBoard)
    await this.saveBoards(boards)
    return newBoard
  }

  async updateBoard(id: string, updates: Partial<Board>): Promise<Board> {
    await this.delay()
    const boards = await this.getBoards()
    const boardIndex = boards.findIndex((board) => board.id === id)

    if (boardIndex === -1) {
      throw new Error('Board not found')
    }

    boards[boardIndex] = {
      ...boards[boardIndex],
      ...updates,
      updatedAt: new Date(),
    }

    await this.saveBoards(boards)
    return boards[boardIndex]
  }

  async deleteBoard(id: string): Promise<boolean> {
    await this.delay()
    const boards = await this.getBoards()
    const filteredBoards = boards.filter((board) => board.id !== id)

    if (filteredBoards.length === boards.length) {
      return false // Board not found
    }

    await this.saveBoards(filteredBoards)
    return true
  }

  // Card operations
  async getCards(boardId: string): Promise<Card[]> {
    const board = await this.getBoard(boardId)
    return board?.columns.flatMap((col) => col.cards) || []
  }

  async getCard(id: string): Promise<Card | null> {
    const boards = await this.getBoards()
    for (const board of boards) {
      for (const column of board.columns) {
        const card = column.cards.find((c) => c.id === id)
        if (card) return card
      }
    }
    return null
  }

  async createCard(cardData: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card> {
    await this.delay()
    const boards = await this.getBoards()
    const board = boards.find((b) => b.id === cardData.columnId.split('_')[0]) // Assuming columnId format

    if (!board) {
      throw new Error('Board not found')
    }

    const column = board.columns.find((col) => col.id === cardData.columnId)
    if (!column) {
      throw new Error('Column not found')
    }

    const newCard: Card = {
      ...cardData,
      id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    column.cards.push(newCard)
    await this.saveBoards(boards)
    return newCard
  }

  async updateCard(id: string, updates: Partial<Card>): Promise<Card> {
    await this.delay()
    const boards = await this.getBoards()

    for (const board of boards) {
      for (const column of board.columns) {
        const cardIndex = column.cards.findIndex((card) => card.id === id)
        if (cardIndex !== -1) {
          column.cards[cardIndex] = {
            ...column.cards[cardIndex],
            ...updates,
            updatedAt: new Date(),
          }
          await this.saveBoards(boards)
          return column.cards[cardIndex]
        }
      }
    }

    throw new Error('Card not found')
  }

  async deleteCard(id: string): Promise<boolean> {
    await this.delay()
    const boards = await this.getBoards()

    for (const board of boards) {
      for (const column of board.columns) {
        const cardIndex = column.cards.findIndex((card) => card.id === id)
        if (cardIndex !== -1) {
          column.cards.splice(cardIndex, 1)
          await this.saveBoards(boards)
          return true
        }
      }
    }

    return false
  }

  // Column operations
  async getColumns(boardId: string): Promise<Column[]> {
    const board = await this.getBoard(boardId)
    return board?.columns || []
  }

  async getColumn(id: string): Promise<Column | null> {
    const boards = await this.getBoards()
    for (const board of boards) {
      const column = board.columns.find((col) => col.id === id)
      if (column) return column
    }
    return null
  }

  async createColumn(columnData: Omit<Column, 'id' | 'createdAt' | 'updatedAt'>): Promise<Column> {
    await this.delay()
    const boards = await this.getBoards()
    const board = boards.find((b) => b.id === columnData.boardId)

    if (!board) {
      throw new Error('Board not found')
    }

    const newColumn: Column = {
      ...columnData,
      id: `col_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      cards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    board.columns.push(newColumn)
    await this.saveBoards(boards)
    return newColumn
  }

  async updateColumn(id: string, updates: Partial<Column>): Promise<Column> {
    await this.delay()
    const boards = await this.getBoards()

    for (const board of boards) {
      const columnIndex = board.columns.findIndex((col) => col.id === id)
      if (columnIndex !== -1) {
        board.columns[columnIndex] = {
          ...board.columns[columnIndex],
          ...updates,
          updatedAt: new Date(),
        }
        await this.saveBoards(boards)
        return board.columns[columnIndex]
      }
    }

    throw new Error('Column not found')
  }

  async deleteColumn(id: string): Promise<boolean> {
    await this.delay()
    const boards = await this.getBoards()

    for (const board of boards) {
      const columnIndex = board.columns.findIndex((col) => col.id === id)
      if (columnIndex !== -1) {
        board.columns.splice(columnIndex, 1)
        await this.saveBoards(boards)
        return true
      }
    }

    return false
  }

  // User operations
  async getUser(): Promise<User | null> {
    await this.delay()
    try {
      const userJson = localStorage.getItem(this.getStorageKey('user'))
      if (!userJson) {
        // Return null if no user exists
        return null
      }
      const user = JSON.parse(userJson)
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }
    } catch (error) {
      console.error('Error loading user:', error)
      return null
    }
  }

  async updateUser(updates: Partial<User>): Promise<User> {
    await this.delay()
    const user = await this.getUser()
    if (!user) {
      throw new Error('User not found')
    }

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    }

    await this.saveUser(updatedUser)
    return updatedUser
  }

  // Private helper methods
  private async saveBoards(boards: Board[]): Promise<void> {
    localStorage.setItem(this.getStorageKey('boards'), JSON.stringify(boards))
  }

  private async saveUser(user: User): Promise<void> {
    localStorage.setItem(this.getStorageKey('user'), JSON.stringify(user))
  }
}

// Export the service instance
export const dataService: DataService = new LocalStorageService()

// Export types for future API implementation
export type { DataService }

// Future API implementation can be easily swapped in:
// export const dataService: DataService = new ApiService()
