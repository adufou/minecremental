<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border border-stone-200 bg-white text-stone-950 shadow dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
