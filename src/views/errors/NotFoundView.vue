<template>
  <div class="min-h-screen bg-background flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-foreground mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
      <p class="text-muted-foreground mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <BaseButton @click="goHome">Go Home</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/Button.vue'

const router = useRouter()

const goHome = () => {
  router.push({ name: 'home' })
}
</script>
