import type { Column } from '@/types'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { columnService } from '@/lib/services'
import { useBoardStore } from './board'

export const useColumnStore = defineStore('column', () => {
  const boardStore = useBoardStore()

  // Getters
  const currentBoard = computed(() => boardStore.currentBoard)

  // Actions
  const addColumn = async (
    columnData: Omit<Column, 'id' | 'createdAt' | 'updatedAt' | 'cards'>,
  ) => {
    if (!currentBoard.value) return false

    try {
      const newColumn = await columnService.createColumn({
        ...columnData,
        position: currentBoard.value.columns.length,
        cards: [],
      })

      // Update local state
      currentBoard.value.columns.push(newColumn)
      return true
    } catch (error) {
      console.error('Failed to create column:', error)
      return false
    }
  }

  const updateColumn = (columnId: string, updates: Partial<Column>) => {
    if (!currentBoard.value) return false

    const columnIndex = currentBoard.value.columns.findIndex((col) => col.id === columnId)
    if (columnIndex !== -1) {
      currentBoard.value.columns[columnIndex] = {
        ...currentBoard.value.columns[columnIndex],
        ...updates,
        updatedAt: new Date(),
      }
      return true
    }
    return false
  }

  const deleteColumn = (columnId: string) => {
    if (!currentBoard.value) return false

    const columnIndex = currentBoard.value.columns.findIndex((col) => col.id === columnId)
    if (columnIndex !== -1) {
      currentBoard.value.columns.splice(columnIndex, 1)
      // Reorder remaining columns
      currentBoard.value.columns.forEach((col, index) => {
        col.position = index
      })
      return true
    }
    return false
  }

  const moveColumn = (columnId: string, newPosition: number): boolean => {
    if (!currentBoard.value) return false

    const columnIndex = currentBoard.value.columns.findIndex((col) => col.id === columnId)
    if (columnIndex === -1) return false

    const [column] = currentBoard.value.columns.splice(columnIndex, 1)
    currentBoard.value.columns.splice(newPosition, 0, column)

    // Update positions
    currentBoard.value.columns.forEach((col, index) => {
      col.position = index
    })

    return true
  }

  const getColumnById = (columnId: string): Column | null => {
    if (!currentBoard.value) return null
    return currentBoard.value.columns.find((col) => col.id === columnId) || null
  }

  const getColumnByPosition = (position: number): Column | null => {
    if (!currentBoard.value) return null
    return currentBoard.value.columns.find((col) => col.position === position) || null
  }

  const reorderColumns = (columnIds: string[]): boolean => {
    if (!currentBoard.value) return false

    // Create a map of current columns
    const columnMap = new Map(currentBoard.value.columns.map((col) => [col.id, col]))

    // Reorder columns based on the provided order
    const reorderedColumns: Column[] = []
    for (const columnId of columnIds) {
      const column = columnMap.get(columnId)
      if (column) {
        reorderedColumns.push(column)
      }
    }

    // Update positions and replace columns
    reorderedColumns.forEach((column, index) => {
      column.position = index
    })
    currentBoard.value.columns = reorderedColumns

    return true
  }

  return {
    // Actions
    addColumn,
    updateColumn,
    deleteColumn,
    moveColumn,
    getColumnById,
    getColumnByPosition,
    reorderColumns,
  }
})
