<script setup lang="ts">
import { useMineStore } from '@/modules/Mine/store/mine.store';
import { UiButton } from '@/shared/ui/button';
import { UiCard } from '@/shared/ui/card';
import {
    UiNumberField,
    UiNumberFieldContent,
    UiNumberFieldDecrement,
    UiNumberFieldIncrement,
    UiNumberFieldInput,
} from '@/shared/ui/number-field';

const mineStore = useMineStore();

const handleDepthChange = (v: number) => {
    mineStore.depth = v;
};
</script>

<template>
    <UiCard class="flex justify-between w-full gap-1 p-2 items-center">
        <UiNumberField
            @update:model-value="handleDepthChange"
            :default-value="mineStore.depth"
            :min="0"
            :max="mineStore.maxDepth"
        >
            <UiNumberFieldContent>
                <UiNumberFieldDecrement />
                <UiNumberFieldInput />
                <UiNumberFieldIncrement />
            </UiNumberFieldContent>
        </UiNumberField>
        <span>Max: {{ mineStore.maxDepth }}</span>
        <UiButton>Cost: X</UiButton>
    </UiCard>
</template>

<style scoped></style>
