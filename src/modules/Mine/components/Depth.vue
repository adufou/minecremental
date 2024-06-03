<script setup lang="ts">
import { useInventoryStore } from '@/modules/Inventory/store/inventory.store';
import { useMineStore } from '@/modules/Mine/store/mine.store';
import { Items } from '@/shared/constants/items';
import { UiButton } from '@/shared/ui/button';
import { UiCard } from '@/shared/ui/card';
import {
    UiNumberField,
    UiNumberFieldContent,
    UiNumberFieldDecrement,
    UiNumberFieldIncrement,
    UiNumberFieldInput,
} from '@/shared/ui/number-field';
import { display } from '@/utils/numbers';
import { computed } from 'vue';

const inventoryStore = useInventoryStore();
const mineStore = useMineStore();

const isUpgradeDisabled = computed(() => {
    return !inventoryStore.hasEnoughOfItemInInventory({
        item: Items.COBBLESTONE,
        quantity: mineStore.maxDepthUpgradeCost,
    });
});

const handleDepthChange = (v: number) => {
    mineStore.depth = v;
};

const handleUpgradeMaxDepth = () => {
    if (
        inventoryStore.hasEnoughOfItemInInventory({
            item: Items.COBBLESTONE,
            quantity: mineStore.maxDepthUpgradeCost,
        })
    ) {
        inventoryStore.removeItemFromPlayerInventory({
            item: Items.COBBLESTONE,
            quantity: mineStore.maxDepthUpgradeCost,
        });

        mineStore.maxDepth++;
    }
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
        <UiButton
            :disabled="isUpgradeDisabled"
            @click="handleUpgradeMaxDepth"
            >Cost: {{ display(mineStore.maxDepthUpgradeCost) }}</UiButton
        >
    </UiCard>
</template>

<style scoped></style>
