<template>
  <Modal
    :is-open="isOpen"
    title="Create New Board"
    :show-close-button="true"
    @close="$emit('close')"
  >
    <div class="space-y-4">
      <Input
        id="board-name"
        v-model="boardName"
        placeholder="Enter board name..."
        :disabled="isLoading"
        @keydown.enter="handleCreateBoard"
      />
    </div>

    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <InteractiveButton
          :loading="isLoading"
          :disabled="!boardName.trim()"
          @click="handleCreateBoard"
        >
          New
        </InteractiveButton>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import Input from '@/components/ui/Input.vue'
import InteractiveButton from '@/components/ui/InteractiveButton.vue'

interface Props {
  isOpen: boolean
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const emit = defineEmits<{
  close: []
  create: [boardName: string]
}>()

const boardName = ref('')

// Reset board name when modal opens/closes
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      boardName.value = ''
    }
  },
)

const handleCreateBoard = () => {
  const trimmedName = boardName.value.trim()
  if (trimmedName && !props.isLoading) {
    emit('create', trimmedName)
  }
}
</script>
