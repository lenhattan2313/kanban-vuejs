<template>
  <div class="relative">
    <div class="absolute inset-0 rounded-md transform translate-y-0.5" :class="shadowColorClass" />

    <button
      :class="buttonClasses"
      :disabled="disabled || loading"
      :type="type"
      @click="handleClick"
    >
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
        <div
          class="h-4 w-4  animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      </div>
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Define component name for better debugging
defineOptions({
  name: 'InteractiveButton',
})

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden transform transition-all duration-100 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-lg',
        destructive: 'bg-destructive text-destructive-foreground   shadow-lg',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-md',
        secondary: 'bg-secondary text-secondary-foreground shadow-lg',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface Props {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
  loading: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isPressed = ref(false)

// Computed classes
const buttonClasses = computed(() => {
  const baseClasses = cn(buttonVariants({ variant: props.variant, size: props.size }))
  const pressClasses = isPressed.value
    ? 'translate-y-0.5 shadow-sm'
    : 'translate-y-0 hover:shadow-xl'

  return cn(baseClasses, pressClasses)
})

const shadowColorClass = computed(() => {
  const variantShadows = {
    default: 'bg-primary/45',
    destructive: 'bg-destructive/20',
    outline: 'bg-muted/20',
    secondary: 'bg-secondary/20',
    ghost: 'bg-muted/20',
    link: 'bg-primary/20',
  }
  return variantShadows[props.variant]
})

// Event handler
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    isPressed.value = true
    emit('click', event)
    setTimeout(() => {
      isPressed.value = false
    }, 150)
  }
}
</script>

<style scoped>
/* Prevent text selection during press */
button {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
