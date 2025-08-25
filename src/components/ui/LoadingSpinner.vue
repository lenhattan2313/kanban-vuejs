<template>
  <div :class="spinnerClasses" :style="spinnerStyles">
    <div
      class="animate-spin rounded-full border-2 border-current border-t-transparent"
      :class="sizeClasses"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Define component name for better debugging
defineOptions({
  name: 'LoadingSpinner',
})

const spinnerVariants = cva('inline-flex items-center justify-center', {
  variants: {
    size: {
      sm: '',
      default: '',
      lg: '',
      xl: '',
    },
    variant: {
      default: 'text-primary',
      secondary: 'text-secondary-foreground',
      muted: 'text-muted-foreground',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
})

const sizeClasses = cva('', {
  variants: {
    size: {
      sm: 'h-10 w-10',
      default: 'h-12 w-12',
      lg: 'h-16 w-16',
      xl: 'h-20 w-20',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface Props {
  size?: 'sm' | 'default' | 'lg' | 'xl'
  variant?: 'default' | 'secondary' | 'muted' | 'white'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  variant: 'default',
  className: '',
})

const spinnerClasses = computed(() =>
  cn(spinnerVariants({ size: props.size, variant: props.variant }), props.className),
)

const spinnerStyles = computed(() => ({
  '--tw-spin-duration': '1s',
}))
</script>
