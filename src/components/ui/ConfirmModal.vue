<template>
  <Modal :is-open="isOpen" :title="title" :show-close-button="true" @close="$emit('close')">
    <div class="space-y-4">
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
            <IconTrash class="w-5 h-5 text-destructive" />
          </div>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-medium text-foreground">{{ message }}</h3>
          <p v-if="description" class="mt-1 text-sm text-muted-foreground">
            {{ description }}
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <InteractiveButton variant="outline" :disabled="isLoading" @click="$emit('close')">
          Cancel
        </InteractiveButton>
        <InteractiveButton :loading="isLoading" @click="$emit('confirm')">
          {{ confirmText }}
        </InteractiveButton>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from './Modal.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import InteractiveButton from './InteractiveButton.vue'

interface Props {
  isOpen: boolean
  title?: string
  message: string
  description?: string
  confirmText?: string
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Confirm Action',
  confirmText: 'Delete',
  isLoading: false,
})

defineEmits<{
  close: []
  confirm: []
}>()
</script>
