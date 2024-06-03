<script setup lang="ts">
import { cn } from '@/utils/utils';
import { NumberFieldInput } from 'radix-vue';
</script>

<template>
    <NumberFieldInput
        :class="
            cn(
                'flex h-9 w-full rounded-md border border-stone-200 bg-transparent px-10 py-1 text-sm text-center shadow-sm transition-colors placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-800 dark:placeholder:text-stone-400 dark:focus-visible:ring-stone-300',
            )
        "
    />
</template>
