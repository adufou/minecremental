<script setup lang="ts">
import { useMineStore } from '@/modules/Mine/store/mine.store';
import ProgressButton from '@/shared/components/ProgressButton.vue';
import { UiSeparator } from '@/shared/ui/separator';

const mineStore = useMineStore();

const mineAtDepth = () => {
    mineStore.mineByClick(mineStore.depth);
};
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-2 h-11">
            <ProgressButton
                :onClick="mineAtDepth"
                :progress="mineStore.progress"
            >
                Mine
            </ProgressButton>
            <UiSeparator orientation="vertical" />
            <div class="flex flex-col items-end w-24">
                <p>{{ mineStore.progress.toFixed(2) }}%</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
