/**
 * Application constants
 */

export const APP_NAME = 'Vue Kanban'
export const APP_VERSION = '1.0.0'

/**
 * Priority levels
 */
export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const

export const PRIORITY_LABELS = {
  [PRIORITIES.LOW]: 'Low',
  [PRIORITIES.MEDIUM]: 'Medium',
  [PRIORITIES.HIGH]: 'High',
  [PRIORITIES.URGENT]: 'Urgent',
} as const

export const PRIORITY_COLORS = {
  [PRIORITIES.LOW]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [PRIORITIES.MEDIUM]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  [PRIORITIES.HIGH]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  [PRIORITIES.URGENT]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
} as const

/**
 * Theme options
 */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const

/**
 * Column colors
 */
export const COLUMN_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
] as const

/**
 * Validation limits
 */
export const LIMITS = {
  CARD_TITLE_MAX: 100,
  CARD_DESCRIPTION_MAX: 500,
  COLUMN_TITLE_MAX: 50,
  COLUMN_DESCRIPTION_MAX: 200,
  BOARD_TITLE_MAX: 100,
  BOARD_DESCRIPTION_MAX: 500,
  MAX_TAGS_PER_CARD: 5,
  MAX_CARDS_PER_COLUMN: 100,
} as const

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  THEME: 'kanban-theme',
  USER_PREFERENCES: 'kanban-user-preferences',
  RECENT_BOARDS: 'kanban-recent-boards',
} as const

/**
 * API endpoints (for future use)
 */
export const API_ENDPOINTS = {
  BOARDS: '/api/boards',
  CARDS: '/api/cards',
  COLUMNS: '/api/columns',
  USERS: '/api/users',
} as const

/**
 * Animation durations
 */
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const
