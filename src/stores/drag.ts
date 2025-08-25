import type { DragItem, DropResult } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCardStore } from './card'
import { useColumnStore } from './column'

export const useDragStore = defineStore('drag', () => {
  const cardStore = useCardStore()
  const columnStore = useColumnStore()

  // State
  const isDragging = ref(false)
  const dragItem = ref<DragItem | null>(null)

  // Actions
  const startDrag = (item: DragItem) => {
    isDragging.value = true
    dragItem.value = item
  }

  const endDrag = () => {
    isDragging.value = false
    dragItem.value = null
  }

  const handleDrop = (dropResult: DropResult): boolean => {
    if (!dragItem.value) return false

    const { dragItem: item } = dragItem.value

    if (item.type === 'card' && dropResult.type === 'card') {
      const success = cardStore.moveCard(
        item.id,
        item.sourceColumnId!,
        dropResult.targetColumnId!,
        dropResult.targetIndex!,
      )

      if (success) {
        endDrag()
        return true
      }
    }

    if (item.type === 'column' && dropResult.type === 'column') {
      const success = columnStore.moveColumn(item.id, dropResult.targetIndex!)

      if (success) {
        endDrag()
        return true
      }
    }

    endDrag()
    return false
  }

  const updateDragItem = (updates: Partial<DragItem>) => {
    if (dragItem.value) {
      dragItem.value = { ...dragItem.value, ...updates }
    }
  }

  const clearDragState = () => {
    isDragging.value = false
    dragItem.value = null
  }

  return {
    // State
    isDragging,
    dragItem,

    // Actions
    startDrag,
    endDrag,
    handleDrop,
    updateDragItem,
    clearDragState,
  }
})
