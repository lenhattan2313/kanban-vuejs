<template>
  <Modal :is-open="true" title="New Board" :show-close-button="true" @close="$emit('close')">
    <div class="space-y-4">
      <Input
        id="board-name"
        v-model="boardName"
        placeholder="Enter board name..."
        :disabled="boardStore.isLoading"
        @keydown.enter="handleCreateBoard"
      />
    </div>

    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <InteractiveButton
          :loading="boardStore.isLoading"
          :disabled="!boardName.trim()"
          @click="handleCreateBoard"
        >
          Create
        </InteractiveButton>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import Input from '@/components/ui/Input.vue'
import InteractiveButton from '@/components/ui/InteractiveButton.vue'
import { useBoardStore } from '@/stores/board'
import { useUserStore } from '@/stores/user'

const emit = defineEmits<{
  close: []
}>()

const boardStore = useBoardStore()
const userStore = useUserStore()
const boardName = ref('')

// Reset board name when modal opens
onMounted(() => {
  boardName.value = ''
})

const handleCreateBoard = async () => {
  const trimmedName = boardName.value.trim()
  if (trimmedName && !boardStore.isLoading) {
    try {
      await boardStore.createBoard({
        title: trimmedName,
        description: '',
        ownerId: userStore.currentUser?.id || 'current-user',
        isPublic: false,
        columns: [],
        settings: {
          theme: 'light',
          allowComments: true,
          allowAttachments: true,
          autoArchive: false,
          workflowRules: [],
        },
        members: [],
      })

      // Close modal after successful creation
      emit('close')
    } catch (error) {
      console.error('Failed to create board:', error)
      // Error handling is managed by the store
    }
  }
}
</script>
