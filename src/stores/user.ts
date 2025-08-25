import type { User } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '@/lib/services'

export const useUserStore = defineStore('user', () => {
  // State
  const currentUser = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  const setLoading = (loading: boolean, errorMessage: string | null = null) => {
    isLoading.value = loading
    error.value = errorMessage
  }

  const fetchUser = async () => {
    setLoading(true)
    try {
      const userData = await userService.getUser()
      currentUser.value = userData
    } catch (err) {
      setLoading(false, 'Failed to fetch user')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true)
    try {
      const newUser = await userService.createUser(userData)
      currentUser.value = newUser
      return newUser
    } catch (err) {
      setLoading(false, 'Failed to create user')
      console.error('Failed to create user:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (userData: User) => {
    setLoading(true)
    try {
      const updatedUser = await userService.updateUser(userData)
      currentUser.value = updatedUser
      return updatedUser
    } catch (err) {
      setLoading(false, 'Failed to update user')
      console.error('Failed to update user:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const initializeUser = async () => {
    try {
      const userData = await userService.getUser()
      currentUser.value = userData
    } catch (error) {
      console.error('Failed to initialize user:', error)
    }
  }

  const setCurrentUser = (user: User | null) => {
    currentUser.value = user
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    currentUser,
    isLoading,
    error,

    // Actions
    setLoading,
    fetchUser,
    createUser,
    updateUser,
    initializeUser,
    setCurrentUser,
    clearError,
  }
})
