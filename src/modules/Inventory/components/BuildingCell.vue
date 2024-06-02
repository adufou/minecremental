<script setup lang="ts">
import type { VillageBuilding } from '@/shared/models/villageTypes';
import { Card } from '@/shared/ui/card';
import { display } from '@/utils/numbers';

const props = defineProps<{
    building: VillageBuilding;
}>();
</script>

<template>
    <Card
        class="flex justify-between h-16 w-full overflow-clip relative gap-1 p-2"
    >
        <div class="flex flex-row justify-between items-center w-full h-full">
            <span class="text-lg text-stone-50">
                {{ props.building.building.displayName }}
            </span>
            <span class="text-sm text-stone-500">
                {{ display(props.building.quantity) }}
            </span>
            <span class="text-xs text-stone-500">{perSecond}</span>
        </div>
    </Card>
</template>

<style scoped></style>
