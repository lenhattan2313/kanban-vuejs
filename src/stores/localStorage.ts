import { defineStore } from 'pinia'
import { STORAGE_KEYS } from '@/utils/constants'

export const useLocalStorageStore = defineStore('localStorage', () => {
  // Actions
  const saveRecentBoard = (boardId: string) => {
    try {
      const recentBoards = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT_BOARDS) || '[]')
      const updatedBoards = [boardId, ...recentBoards.filter((id: string) => id !== boardId)].slice(
        0,
        5,
      )
      localStorage.setItem(STORAGE_KEYS.RECENT_BOARDS, JSON.stringify(updatedBoards))
    } catch (error) {
      console.error('Failed to save recent board:', error)
    }
  }

  const getRecentBoards = (): string[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT_BOARDS) || '[]')
    } catch (error) {
      console.error('Failed to get recent boards:', error)
      return []
    }
  }

  const saveUserPreference = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Failed to save user preference ${key}:`, error)
    }
  }

  const getUserPreference = <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Failed to get user preference ${key}:`, error)
      return defaultValue
    }
  }

  const removeUserPreference = (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Failed to remove user preference ${key}:`, error)
    }
  }

  const clearAllPreferences = () => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Failed to clear all preferences:', error)
    }
  }

  const saveThemePreference = (theme: 'light' | 'dark' | 'auto') => {
    saveUserPreference('theme', theme)
  }

  const getThemePreference = (): 'light' | 'dark' | 'auto' => {
    return getUserPreference('theme', 'auto')
  }

  const saveSidebarState = (isCollapsed: boolean) => {
    saveUserPreference('sidebarCollapsed', isCollapsed)
  }

  const getSidebarState = (): boolean => {
    return getUserPreference('sidebarCollapsed', false)
  }

  return {
    // Recent boards
    saveRecentBoard,
    getRecentBoards,

    // Generic preferences
    saveUserPreference,
    getUserPreference,
    removeUserPreference,
    clearAllPreferences,

    // Specific preferences
    saveThemePreference,
    getThemePreference,
    saveSidebarState,
    getSidebarState,
  }
})
