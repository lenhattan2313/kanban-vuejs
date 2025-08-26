import { ref, computed, type Component } from 'vue'

export interface ModalConfig {
  id: string
  component: Component
  props?: Record<string, unknown>
}

class ModalService {
  private modals = ref<ModalConfig[]>([])

  // Computed properties
  public readonly currentModal = computed(() => {
    return this.modals.value[this.modals.value.length - 1] || null
  })

  public readonly hasModals = computed(() => this.modals.value.length > 0)

  public readonly modalCount = computed(() => this.modals.value.length)

  /**
   * Open a new modal and add it to the stack
   */
  public open(config: ModalConfig): void {
    // Check if modal with same ID already exists
    const existingIndex = this.modals.value.findIndex((modal) => modal.id === config.id)
    if (existingIndex !== -1) {
      // Remove existing modal with same ID
      this.modals.value.splice(existingIndex, 1)
    }

    // Add new modal to the top of the stack
    this.modals.value.push(config)
  }

  /**
   * Close the top modal (LIFO - Last In, First Out)
   */
  public close(): void {
    if (this.modals.value.length > 0) {
      this.modals.value.pop()
    }
  }

  /**
   * Close a specific modal by ID
   */
  public closeById(id: string): void {
    const index = this.modals.value.findIndex((modal) => modal.id === id)
    if (index !== -1) {
      this.modals.value.splice(index, 1)
    }
  }

  /**
   * Close all modals
   */
  public closeAll(): void {
    this.modals.value = []
  }

  /**
   * Get all current modals
   */
  public getModals(): ModalConfig[] {
    return [...this.modals.value]
  }

  /**
   * Check if a specific modal is open
   */
  public isOpen(id: string): boolean {
    return this.modals.value.some((modal) => modal.id === id)
  }

  /**
   * Update props for a specific modal
   */
  public updateProps(id: string, props: Record<string, unknown>): void {
    const modal = this.modals.value.find((modal) => modal.id === id)
    if (modal) {
      modal.props = { ...modal.props, ...props }
    }
  }
}

// Create singleton instance
export const modalService = new ModalService()

// Export reactive refs for components to use
export const useModalService = () => {
  return {
    currentModal: modalService.currentModal,
    hasModals: modalService.hasModals,
    modalCount: modalService.modalCount,
    open: modalService.open.bind(modalService),
    close: modalService.close.bind(modalService),
    closeById: modalService.closeById.bind(modalService),
    closeAll: modalService.closeAll.bind(modalService),
    getModals: modalService.getModals.bind(modalService),
    isOpen: modalService.isOpen.bind(modalService),
    updateProps: modalService.updateProps.bind(modalService),
  }
}
