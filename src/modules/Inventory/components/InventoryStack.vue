<script setup lang="ts">
import { getImageOfItem } from '@/utils/image';
import { display } from '@/utils/numbers';
import type { ItemStack } from '@/modules/Inventory/models/inventory';
import { Card } from '@/shared/ui/card';
import { computed } from 'vue';

const props = defineProps<{
    stack: ItemStack;
}>();

const durabilityBarStyle = computed(() => {
    const style: {
        backgroundColor?: string;
        width?: string;
    } = {
        backgroundColor: undefined,
        width: 'bg-lime-700',
    };

    if (
        props.stack.item.durability &&
        props.stack.durability &&
        props.stack.durability !== props.stack.item.durability
    ) {
        const durabilityRatio =
            props.stack.durability / props.stack.item.durability;

        style.backgroundColor = `rgb(${255 - durabilityRatio * 255}, ${
            durabilityRatio * 255
        }, 0)`;

        style.width = `${durabilityRatio * 100}%`;
    }

    return style;
});

const durabilityDisplayedValue = computed<string>(() => {
    if (
        props.stack.item.durability !== undefined &&
        props.stack.durability !== undefined &&
        props.stack.durability !== props.stack.item.durability
    ) {
        return display(props.stack.durability);
    }

    return '';
});

const perSecond = computed(() => {
    return props.stack.perSecond
        ? `(${display(props.stack.perSecond)} /s)`
        : '';
});
</script>

<template>
    <Card
        class="flex justify-between h-16 w-full overflow-clip relative gap-1 p-2"
    >
        <div class="relative w-12 h-12 flex-shrink-0">
            <img
                class="h-full w-full"
                :src="getImageOfItem(props.stack.item)"
            />
            <div
                class="flex absolute bottom-0 right-0 h-1 w-full justify-center"
            >
                <div class="h-1/2 w-1/2 rounded-sm">
                    <div
                        class="h-full rounded-sm"
                        :style="durabilityBarStyle"
                    />
                </div>
            </div>
        </div>

        <div class="flex flex-col justify-between w-full h-full">
            <div class="flex flex-row justify-between">
                <span class="text-sm text-stone-50">
                    {{ props.stack.item.displayName }}
                </span>
                <div class="flex gap-1 items-baseline">
                    <span class="text-sm text-stone-500">
                        {{ display(props.stack.size) }}
                    </span>
                    <span class="text-xs text-stone-500">
                        {{ perSecond }}
                    </span>
                </div>
            </div>

            <div class="flex flex-row justify-between">
                <span class="text-sm text-stone-50">
                    {{
                        props.stack.durability !== undefined ? 'Durability' : ''
                    }}
                </span>
                <span class="text-sm text-stone-500">
                    {{ durabilityDisplayedValue }}
                </span>
            </div>
        </div>
    </Card>
</template>

<style scoped></style>
