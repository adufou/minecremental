<script setup lang="ts">
import BuildingCell from '@/modules/Inventory/components/BuildingCell.vue';
import InventoryStack from '@/modules/Inventory/components/InventoryStack.vue';
import { useInventoryStore } from '@/modules/Inventory/store/inventory.store';
import {
    UiAccordion,
    UiAccordionContent,
    UiAccordionItem,
    UiAccordionTrigger,
} from '@/shared/ui/accordion';
import { UiCard } from '@/shared/ui/card';
import { computed, ref } from 'vue';

const inventoryStore = useInventoryStore();

const activeAccordions = ref<string[]>([]);

const inventory = computed(() => {
    return inventoryStore.inventory;
});

const village = computed(() => {
    return [];
});

const toggleAccordion = (value: string) => {
    if (activeAccordions.value.includes(value)) {
        activeAccordions.value = activeAccordions.value.filter(
            (v) => v !== value,
        );
    } else {
        activeAccordions.value = [...activeAccordions.value, value];
    }
};
</script>

<template>
    <div class="flex flex-shrink-0 w-64 m-2 ml-0">
        <UiCard class="h-full w-full">
            <div class="flex flex-col p-2 gap-1">
                <UiAccordion
                    type="multiple"
                    :value="{ activeAccordions }"
                >
                    <UiAccordionItem value="inventory">
                        <UiAccordionTrigger
                            @click="() => toggleAccordion('inventory')"
                        >
                            Inventory
                        </UiAccordionTrigger>
                        <UiAccordionContent
                            v-for="[key, value] in Object.entries(inventory)"
                            :key="'inv-' + key"
                        >
                            <InventoryStack :stack="value" />
                        </UiAccordionContent>
                    </UiAccordionItem>

                    <UiAccordionItem value="village">
                        <UiAccordionTrigger
                            @click="() => toggleAccordion('village')"
                        >
                            Village
                        </UiAccordionTrigger>
                        <UiAccordionContent
                            v-for="[key, value] in Object.entries(village)"
                            :key="'inv-' + key"
                        >
                            <BuildingCell :building="value" />
                        </UiAccordionContent>
                    </UiAccordionItem>
                </UiAccordion>
            </div>
        </UiCard>
    </div>
</template>

<style scoped></style>
