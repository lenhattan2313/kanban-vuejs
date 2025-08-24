// User and Authentication
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'admin' | 'member' | 'viewer'

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: string
  notifications: NotificationSettings
  boardView: 'kanban' | 'list' | 'calendar'
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  mentions: boolean
  dueDateReminders: boolean
}

// Card Management
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
  attachments: Attachment[]
  comments: Comment[]
  timeEstimate?: number // in minutes
  timeSpent?: number // in minutes
  createdAt: Date
  updatedAt: Date
}

export interface Attachment {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedBy: string
  uploadedAt: Date
}

export interface Comment {
  id: string
  content: string
  authorId: string
  authorName: string
  authorAvatar?: string
  createdAt: Date
  updatedAt: Date
}

// Column Management
export interface Column {
  id: string
  title: string
  description?: string
  position: number
  boardId: string
  cards: Card[]
  maxCards?: number
  color?: string
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}

// Board Management
export interface Board {
  id: string
  title: string
  description?: string
  ownerId: string
  isPublic: boolean
  columns: Column[]
  settings: BoardSettings
  members: BoardMember[]
  createdAt: Date
  updatedAt: Date
}

export interface BoardMember {
  userId: string
  role: BoardRole
  joinedAt: Date
}

export type BoardRole = 'owner' | 'admin' | 'member' | 'viewer'

export interface BoardSettings {
  theme: 'light' | 'dark' | 'auto'
  allowComments: boolean
  allowAttachments: boolean
  maxCardsPerColumn?: number
  autoArchive: boolean
  cardTemplate?: CardTemplate
  workflowRules: WorkflowRule[]
}

export interface CardTemplate {
  defaultPriority: Priority
  defaultTags: string[]
  requiredFields: string[]
}

export interface WorkflowRule {
  id: string
  name: string
  condition: WorkflowCondition
  action: WorkflowAction
  isActive: boolean
}

export interface WorkflowCondition {
  field: 'priority' | 'assignee' | 'dueDate' | 'tags'
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan'
  value: string | number | Date
}

export interface WorkflowAction {
  type: 'moveCard' | 'changePriority' | 'assignUser' | 'addTag' | 'sendNotification'
  value: string | number
}

// Priority and Status
export type Priority = 'low' | 'medium' | 'high' | 'urgent'

// Drag and Drop
export interface DragItem {
  type: 'card' | 'column'
  id: string
  sourceColumnId?: string
  sourceIndex?: number
  data?: any
}

export interface DropResult {
  type: 'card' | 'column'
  id: string
  targetColumnId?: string
  targetIndex?: number
  success: boolean
  error?: string
}

// API and State Management
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
  lastUpdated?: Date
}

// Form and Validation
export interface FormField {
  name: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'date' | 'number' | 'checkbox'
  required: boolean
  validation?: ValidationRule[]
  options?: SelectOption[]
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom'
  value?: any
  message: string
}

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

// Events and Notifications
export interface AppEvent {
  type: string
  payload: any
  timestamp: Date
  userId?: string
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  isRead: boolean
  createdAt: Date
  actionUrl?: string
}

// Sidebar and Navigation Types
export interface NavigationItem {
  id: string
  label: string
  icon?: string
  route?: string
  badge?: string | number
  isActive?: boolean
  isDisabled?: boolean
  children?: NavigationItem[]
  permissions?: string[]
  onClick?: () => void
}

export interface SidebarConfig {
  brand: {
    logo?: string
    title: string
    subtitle?: string
  }
  workspace?: {
    id: string
    name: string
    avatar?: string
    avatarText?: string
  }
  navigation: NavigationItem[]
  user?: {
    id: string
    name: string
    email: string
    avatar?: string
    avatarText?: string
    role?: string
  }
  features?: {
    collapsible?: boolean
    mobileResponsive?: boolean
    showUserProfile?: boolean
    showWorkspaceInfo?: boolean
  }
}

export interface SidebarState {
  isCollapsed: boolean
  isMobileOpen: boolean
  activeRoute: string
}
