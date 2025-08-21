/**
 * Validation utilities for the Kanban application
 */

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

/**
 * Validate card data
 */
export function validateCard(card: {
  title: string
  description?: string
  priority: string
  tags?: string[]
}): ValidationResult {
  const errors: string[] = []

  if (!card.title.trim()) {
    errors.push('Title is required')
  } else if (card.title.length > 100) {
    errors.push('Title must be less than 100 characters')
  }

  if (card.description && card.description.length > 500) {
    errors.push('Description must be less than 500 characters')
  }

  if (!['low', 'medium', 'high', 'urgent'].includes(card.priority)) {
    errors.push('Invalid priority level')
  }

  if (card.tags && card.tags.length > 5) {
    errors.push('Maximum 5 tags allowed')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate column data
 */
export function validateColumn(column: {
  title: string
  description?: string
  maxCards?: number
}): ValidationResult {
  const errors: string[] = []

  if (!column.title.trim()) {
    errors.push('Title is required')
  } else if (column.title.length > 50) {
    errors.push('Title must be less than 50 characters')
  }

  if (column.description && column.description.length > 200) {
    errors.push('Description must be less than 200 characters')
  }

  if (column.maxCards && (column.maxCards < 1 || column.maxCards > 100)) {
    errors.push('Max cards must be between 1 and 100')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate board data
 */
export function validateBoard(board: { title: string; description?: string }): ValidationResult {
  const errors: string[] = []

  if (!board.title.trim()) {
    errors.push('Title is required')
  } else if (board.title.length > 100) {
    errors.push('Title must be less than 100 characters')
  }

  if (board.description && board.description.length > 500) {
    errors.push('Description must be less than 500 characters')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email.trim()) {
    errors.push('Email is required')
  } else if (!emailRegex.test(email)) {
    errors.push('Invalid email format')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
