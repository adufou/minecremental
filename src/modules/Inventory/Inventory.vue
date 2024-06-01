<script setup lang="ts">

import {Card} from "@/shared/ui/card";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/ui/accordion";
import {computed, ref} from "vue";
import InventoryStack from "@/modules/PlayerInventory/components/InventoryStack.vue";
import BuildingCell from "@/modules/PlayerInventory/components/BuildingCell.vue";

const activeAccordions = ref<string[]>([]);

const inventory = computed(() => {
    return [];
});

const village = computed(() => {
    return [];
});

const toggleAccordion = (value: string) => {
    if (activeAccordions.value.includes(value)) {
        activeAccordions.value = activeAccordions.value.filter((v) => v !== value);
    } else {
        activeAccordions.value = [...activeAccordions.value, value];
    }
};

</script>

<template>
    <div class='flex flex-shrink-0 w-64 m-2 ml-0'>
        <Card class='h-full w-full'>
            <div class='flex flex-col p-2 gap-1'>
                <Accordion
                    type='multiple'
                    :value={activeAccordions}
                >
                    <AccordionItem value='inventory'>
                        <AccordionTrigger
                            @click="() => toggleAccordion('inventory')"
                        >
                        Inventory
                        </AccordionTrigger>
                        <AccordionContent
                            v-for="([key, value]) in Object.entries(inventory)"
                            :key="'inv-' + key"
                        >
                            <InventoryStack :stack="value" />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='village'>
                        <AccordionTrigger
                            @click="() => toggleAccordion('village')"
                        >
                        Village
                        </AccordionTrigger>
                        <AccordionContent
                            v-for="([key, value]) in Object.entries(village)"
                            :key="'inv-' + key"
                        >
                            <BuildingCell :building="value" />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </Card>
    </div>
</template>

<style scoped>

</style>