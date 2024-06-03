<script setup lang="ts">
import { UiButton } from '@/shared/ui/button';
import { computed } from 'vue';

const props = defineProps<{
    onClick: () => void;
    progress: number;
}>();

const backgroundStyle = computed<{ width: string }>(() => {
    return {
        width: `${props.progress}%`,
    };
});
</script>

<template>
    <div class="w-full relative">
        <div
            class="h-full rounded-md bg-lime-700 absolute"
            :style="backgroundStyle"
        />
        <div class="w-full rounded-md p-1 relative">
            <UiButton
                class="w-full"
                variant="ghost"
                @click="props.onClick"
            >
                <slot />
            </UiButton>
        </div>
    </div>
</template>

<style scoped></style>
