<script setup lang="ts">
import { cn } from '@/utils/utils';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <div :class="cn('relative', props.class)">
        <slot />
    </div>
</template>
