import type { User } from '@/types'

export interface UserService {
  getUser(): Promise<User | null>
  updateUser(updates: Partial<User>): Promise<User>
  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
}

class LocalStorageUserService implements UserService {
  private getStorageKey(key: string): string {
    return `kanban_user_${key}`
  }

  private async delay(ms: number = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async getUser(): Promise<User | null> {
    await this.delay()
    try {
      const userJson = localStorage.getItem(this.getStorageKey('current'))
      if (!userJson) {
        return null
      }
      const user: User = JSON.parse(userJson)
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }
    } catch (error) {
      console.error('Error loading user:', error)
      return null
    }
  }

  async updateUser(updates: Partial<User>): Promise<User> {
    await this.delay()
    try {
      const user = await this.getUser()
      if (!user) {
        throw new Error('User not found')
      }

      const updatedUser = {
        ...user,
        ...updates,
        updatedAt: new Date(),
      }

      await this.saveUser(updatedUser)
      return updatedUser
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    await this.delay()
    try {
      const newUser: User = {
        ...userData,
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await this.saveUser(newUser)
      return newUser
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  private async saveUser(user: User): Promise<void> {
    localStorage.setItem(this.getStorageKey('current'), JSON.stringify(user))
  }
}

export const userService: UserService = new LocalStorageUserService()
