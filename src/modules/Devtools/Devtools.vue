<script setup lang="ts">
import { useTickStore } from '@/shared/stores/tick.store';
import { Button } from '@/shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
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
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    class="text-red-500"
                >
                    DEV
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-96">
                <p>FPS: {{ fps }}</p>
            </PopoverContent>
        </Popover>
    </div>
</template>

<style scoped></style>
