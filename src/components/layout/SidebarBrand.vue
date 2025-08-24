<template>
  <div class="ml-4 py-4 border-b border-gray-200">
    <div class="flex items-center gap-2">
      <!-- Brand Text -->
      <div v-if="!isCollapsed" class="flex flex-col">
        <h3 class="text-xl font-bold text-gray-900">
          {{ brand.title }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Brand {
  title: string
  subtitle?: string
}

interface Props {
  brand: Brand
  isCollapsed?: boolean
}

defineProps<Props>()
</script>
