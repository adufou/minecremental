<script setup lang="ts">
import { useTickStore } from '@/shared/stores/tick.store';
import { UiButton } from '@/shared/ui/button';
import {
    UiPopover,
    UiPopoverContent,
    UiPopoverTrigger,
} from '@/shared/ui/popover';
import { computed, ref } from 'vue';

const tickStore = useTickStore();

const lastTickDuration = ref<number>(0);

const fps = computed(() => {
    return Math.floor(1000 / lastTickDuration.value);
});

tickStore.addTickFunction((elapsedTime: number) => {
    lastTickDuration.value = elapsedTime;
});
</script>

<template>
    <div class="pl-2">
        <UiPopover>
            <UiPopoverTrigger asChild>
                <UiButton
                    variant="outline"
                    class="text-red-500"
                >
                    DEV
                </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent class="w-96">
                <p>FPS: {{ fps }}</p>
            </UiPopoverContent>
        </UiPopover>
    </div>
</template>

<style scoped></style>
