<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Boards</h1>
      <div class="flex items-center gap-3">
        <BaseButton variant="outline" size="sm" @click="importBoard">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Import
        </BaseButton>
        <BaseButton size="sm" @click="createNewBoard">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          New
        </BaseButton>
      </div>
    </div>

    <!-- Boards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <!-- Existing Board -->
      <div
        class="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center min-h-[200px] hover:border-gray-400 transition-colors cursor-pointer"
        @click="openBoard('1')"
      >
        <span class="text-gray-400 text-lg font-medium">fg</span>
      </div>

      <!-- Add New Board -->
      <div
        class="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center min-h-[200px] hover:border-gray-400 transition-colors cursor-pointer"
        @click="createNewBoard"
      >
        <div class="text-center">
          <svg
            class="w-8 h-8 text-gray-400 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span class="text-gray-500 font-medium">Create new board</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/Button.vue'

const router = useRouter()

const openBoard = (boardId: string) => {
  router.push({ name: 'board', params: { id: boardId } })
}

const createNewBoard = () => {
  console.log('Creating new board')
  // TODO: Open create board modal
  // For now, navigate to a new board
  router.push({ name: 'board', params: { id: 'new' } })
}

const importBoard = () => {
  console.log('Importing board')
  // TODO: Open import board modal
}
</script>
