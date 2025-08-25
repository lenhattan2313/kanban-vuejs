import type { Card, Column } from '@/types'

export interface ColumnService {
  getColumns(boardId: string): Promise<Column[]>
  getColumn(id: string): Promise<Column | null>
  createColumn(column: Omit<Column, 'id' | 'createdAt' | 'updatedAt'>): Promise<Column>
  updateColumn(id: string, updates: Partial<Column>): Promise<Column>
  deleteColumn(id: string): Promise<boolean>
  moveColumn(columnId: string, newPosition: number): Promise<boolean>
}

class LocalStorageColumnService implements ColumnService {
  private getStorageKey(key: string): string {
    return `kanban_columns_${key}`
  }

  private async delay(ms: number = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async getColumns(boardId: string): Promise<Column[]> {
    await this.delay()
    try {
      const columnsJson = localStorage.getItem(this.getStorageKey(boardId))
      if (!columnsJson) {
        return []
      }
      const columns: Column[] = JSON.parse(columnsJson)
      return columns.map((column: Column) => ({
        ...column,
        createdAt: new Date(column.createdAt),
        updatedAt: new Date(column.updatedAt),
        cards: (column.cards || []).map((card: Card) => ({
          ...card,
          createdAt: new Date(card.createdAt),
          updatedAt: new Date(card.updatedAt),
        })),
      }))
    } catch (error) {
      console.error('Error loading columns:', error)
      return []
    }
  }

  async getColumn(id: string): Promise<Column | null> {
    await this.delay()
    try {
      const keys = Object.keys(localStorage).filter((key) => key.startsWith('kanban_columns_'))

      for (const key of keys) {
        const columnsJson = localStorage.getItem(key)
        if (columnsJson) {
          const columns = JSON.parse(columnsJson)
          const column = columns.find((c: Column) => c.id === id)
          if (column) {
            return {
              ...column,
              createdAt: new Date(column.createdAt),
              updatedAt: new Date(column.updatedAt),
              cards: (column.cards || []).map((card: Card) => ({
                ...card,
                createdAt: new Date(card.createdAt),
                updatedAt: new Date(card.updatedAt),
              })),
            } as Column
          }
        }
      }
      return null
    } catch (error) {
      console.error('Error loading column:', error)
      return null
    }
  }

  async createColumn(columnData: Omit<Column, 'id' | 'createdAt' | 'updatedAt'>): Promise<Column> {
    await this.delay()
    try {
      const newColumn: Column = {
        ...columnData,
        id: `col_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        cards: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const columns = await this.getColumns(columnData.boardId)
      columns.push(newColumn)
      await this.saveColumns(columnData.boardId, columns)

      return newColumn
    } catch (error) {
      console.error('Error creating column:', error)
      throw error
    }
  }

  async updateColumn(id: string, updates: Partial<Column>): Promise<Column> {
    await this.delay()
    try {
      const keys = Object.keys(localStorage).filter((key) => key.startsWith('kanban_columns_'))

      for (const key of keys) {
        const columnsJson = localStorage.getItem(key)
        if (columnsJson) {
          const columns = JSON.parse(columnsJson)
          const columnIndex = columns.findIndex((c: Column) => c.id === id)

          if (columnIndex !== -1) {
            const updatedColumn = {
              ...columns[columnIndex],
              ...updates,
              updatedAt: new Date(),
            }

            columns[columnIndex] = updatedColumn
            const boardId = key.replace('kanban_columns_', '')
            await this.saveColumns(boardId, columns)

            return {
              ...updatedColumn,
              createdAt: new Date(updatedColumn.createdAt),
              updatedAt: new Date(updatedColumn.updatedAt),
              cards: (updatedColumn.cards || []).map((card: Card) => ({
                ...card,
                createdAt: new Date(card.createdAt),
                updatedAt: new Date(card.updatedAt),
              })),
            } as Column
          }
        }
      }

      throw new Error('Column not found')
    } catch (error) {
      console.error('Error updating column:', error)
      throw error
    }
  }

  async deleteColumn(id: string): Promise<boolean> {
    await this.delay()
    try {
      const keys = Object.keys(localStorage).filter((key) => key.startsWith('kanban_columns_'))

      for (const key of keys) {
        const columnsJson = localStorage.getItem(key)
        if (columnsJson) {
          const columns = JSON.parse(columnsJson)
          const columnIndex = columns.findIndex((c: Column) => c.id === id)

          if (columnIndex !== -1) {
            columns.splice(columnIndex, 1)
            const boardId = key.replace('kanban_columns_', '')
            await this.saveColumns(boardId, columns)
            return true
          }
        }
      }

      return false
    } catch (error) {
      console.error('Error deleting column:', error)
      return false
    }
  }

  async moveColumn(columnId: string, newPosition: number): Promise<boolean> {
    await this.delay()
    try {
      const keys = Object.keys(localStorage).filter((key) => key.startsWith('kanban_columns_'))

      for (const key of keys) {
        const columnsJson = localStorage.getItem(key)
        if (columnsJson) {
          const columns = JSON.parse(columnsJson)
          const columnIndex = columns.findIndex((c: Column) => c.id === columnId)

          if (columnIndex !== -1) {
            const [column] = columns.splice(columnIndex, 1)
            columns.splice(newPosition, 0, column)

            // Update positions
            columns.forEach((col: Column, index: number) => {
              col.position = index
            })

            const boardId = key.replace('kanban_columns_', '')
            await this.saveColumns(boardId, columns)
            return true
          }
        }
      }

      return false
    } catch (error) {
      console.error('Error moving column:', error)
      return false
    }
  }

  private async saveColumns(boardId: string, columns: Column[]): Promise<void> {
    localStorage.setItem(this.getStorageKey(boardId), JSON.stringify(columns))
  }
}

export const columnService: ColumnService = new LocalStorageColumnService()
