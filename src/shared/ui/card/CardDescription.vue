<script setup lang="ts">
import { cn } from '@/utils/utils';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <p :class="cn('text-sm text-stone-500 dark:text-stone-400', props.class)">
        <slot />
    </p>
</template>
