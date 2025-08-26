<template>
  <div class="flex items-center justify-center py-16">
    <div class="text-center max-w-md">
      <div class="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
        <IconPlus class="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 class="text-xl font-semibold text-foreground mb-3">No boards yet</h3>
      <p class="text-muted-foreground mb-8 leading-relaxed">
        Create your first Kanban board to start organizing your tasks and projects efficiently.
      </p>
      <InteractiveButton @click="$emit('create')" :loading="isLoading" class="px-8 py-3" size="lg">
        <IconPlus class="h-5 w-5 mr-2" />
        Create Your First Board
      </InteractiveButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import InteractiveButton from '@/components/ui/InteractiveButton.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

interface Props {
  isLoading?: boolean
}

interface Emits {
  (e: 'create'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
