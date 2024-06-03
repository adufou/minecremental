<script setup lang="ts">
import { useMineStore } from '@/modules/Mine/store/mine.store';
import ProgressButton from '@/shared/components/ProgressButton.vue';
import { UiSeparator } from '@/shared/ui/separator';

const props = defineProps<{
    depth: number;
}>();

const mineStore = useMineStore();

const mineAtDepth = () => {
    mineStore.mineByClick(props.depth);
};
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-2 h-11">
            <span>Depth: {{ props.depth }}</span>
            <UiSeparator orientation="vertical" />
            <ProgressButton
                :onClick="mineAtDepth"
                :progress="mineStore.mineProgress"
            >
                Mine
            </ProgressButton>
            <UiSeparator orientation="vertical" />
            <div class="flex flex-col items-end w-24">
                <p>{{ mineStore.mineProgress.toFixed(2) }}%</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
