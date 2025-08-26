<template>
  <Teleport to="body">
    <div v-if="hasModals" class="fixed inset-0 z-50">
      <!-- Render all modals in stack order -->
      <div
        v-for="(modal, index) in modals"
        :key="modal.id"
        class="absolute inset-0"
        :style="{ zIndex: 50 + index }"
      >
        <component
          :is="modal.component"
          v-bind="modal.props || {}"
          @close="handleClose(modal.id)"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useModalService } from '@/lib/services'

const { hasModals, getModals, closeById } = useModalService()

// Get all modals from the service
const modals = computed(() => getModals())

// Handle modal close
const handleClose = (modalId: string) => {
  closeById(modalId)
}
</script>
