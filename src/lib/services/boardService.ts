import type { Board, Card, Column } from '@/types'

export interface BoardService {
  getBoards(): Promise<Board[]>
  getBoard(id: string): Promise<Board | null>
  createBoard(board: Omit<Board, 'id' | 'createdAt' | 'updatedAt'>): Promise<Board>
  updateBoard(id: string, updates: Partial<Board>): Promise<Board>
  deleteBoard(id: string): Promise<boolean>
}

class LocalStorageBoardService implements BoardService {
  private getStorageKey(key: string): string {
    return `kanban_boards_${key}`
  }

  private async delay(ms: number = 200): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async getBoards(): Promise<Board[]> {
    await this.delay()
    try {
      const boardsJson = localStorage.getItem(this.getStorageKey('list'))
      if (!boardsJson) {
        return []
      }
      const boards: Board[] = JSON.parse(boardsJson)
      return boards.map((board: Board) => ({
        ...board,
        createdAt: new Date(board.createdAt),
        updatedAt: new Date(board.updatedAt),
        columns: (board.columns as Column[]).map((col: Column) => ({
          ...col,
          createdAt: new Date(col.createdAt),
          updatedAt: new Date(col.updatedAt),
          cards: col.cards.map((card: Card) => ({
            ...card,
            createdAt: new Date(card.createdAt),
            updatedAt: new Date(card.updatedAt),
          })),
        })),
      })) as Board[]
    } catch (error) {
      console.error('Error loading boards:', error)
      return []
    }
  }

  async getBoard(id: string): Promise<Board | null> {
    await this.delay()
    try {
      const boardsJson = localStorage.getItem(this.getStorageKey('list'))
      if (!boardsJson) {
        return null
      }
      const boards = JSON.parse(boardsJson)
      const board = boards.find((b: Record<string, unknown>) => b.id === id)

      if (!board) {
        return null
      }

      return {
        ...board,
        createdAt: new Date(board.createdAt),
        updatedAt: new Date(board.updatedAt),
        columns: board.columns.map((col: Column) => ({
          ...col,
          createdAt: new Date(col.createdAt),
          updatedAt: new Date(col.updatedAt),
          cards: col.cards.map((card: Card) => ({
            ...card,
            createdAt: new Date(card.createdAt),
            updatedAt: new Date(card.updatedAt),
          })),
        })),
      } as Board
    } catch (error) {
      console.error('Error loading board:', error)
      return null
    }
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

    const updatedBoard = {
      ...boards[boardIndex],
      ...updates,
      updatedAt: new Date(),
    }

    boards[boardIndex] = updatedBoard
    await this.saveBoards(boards)
    return updatedBoard as Board
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

  private async saveBoards(boards: Board[]): Promise<void> {
    localStorage.setItem(this.getStorageKey('list'), JSON.stringify(boards))
  }
}

export const boardService: BoardService = new LocalStorageBoardService()
