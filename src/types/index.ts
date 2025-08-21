export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Card {
  id: string
  title: string
  description?: string
  priority: Priority
  assigneeId?: string
  dueDate?: Date
  tags: string[]
  position: number
  columnId: string
  createdAt: Date
  updatedAt: Date
}

export interface Column {
  id: string
  title: string
  description?: string
  position: number
  boardId: string
  cards: Card[]
  maxCards?: number
  color?: string
  createdAt: Date
  updatedAt: Date
}

export interface Board {
  id: string
  title: string
  description?: string
  ownerId: string
  isPublic: boolean
  columns: Column[]
  settings: BoardSettings
  createdAt: Date
  updatedAt: Date
}

export interface BoardSettings {
  theme: 'light' | 'dark' | 'auto'
  allowComments: boolean
  allowAttachments: boolean
  maxCardsPerColumn?: number
  autoArchive: boolean
}

export type Priority = 'low' | 'medium' | 'high' | 'urgent'

export interface DragItem {
  type: 'card' | 'column'
  id: string
  sourceColumnId?: string
  sourceIndex?: number
}

export interface DropResult {
  type: 'card' | 'column'
  id: string
  targetColumnId?: string
  targetIndex?: number
}
