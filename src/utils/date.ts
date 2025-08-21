/**
 * Format a date for display in the Kanban interface
 */
export function formatDueDate(date: Date | string): string {
  const dueDate = new Date(date)
  const now = new Date()
  const diffTime = dueDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return 'Overdue'
  } else if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return 'Tomorrow'
  } else if (diffDays <= 7) {
    return `In ${diffDays} days`
  } else {
    return dueDate.toLocaleDateString()
  }
}

/**
 * Check if a date is overdue
 */
export function isOverdue(date: Date | string): boolean {
  const dueDate = new Date(date)
  const now = new Date()
  return dueDate < now
}

/**
 * Check if a date is due soon (within 3 days)
 */
export function isDueSoon(date: Date | string): boolean {
  const dueDate = new Date(date)
  const now = new Date()
  const diffTime = dueDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays >= 0 && diffDays <= 3
}

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const targetDate = new Date(date)
  const now = new Date()
  const diffTime = now.getTime() - targetDate.getTime()
  const diffMinutes = Math.floor(diffTime / (1000 * 60))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffMinutes < 1) {
    return 'Just now'
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
  } else {
    return targetDate.toLocaleDateString()
  }
}
