<script setup lang="ts">

import {Card} from "@/shared/ui/card";
import type {ItemStack} from "@/modules/PlayerInventory/models/inventory";
import {getImageOfItem} from "@/lib/image.utils";
import {computed} from "vue";

const props = defineProps<{
    stack: ItemStack
}>()

const durabilityBarStyle = computed(() => {
    return {}
})

</script>

<template>
    <Card class='flex justify-between h-16 w-full overflow-clip relative gap-1 p-2'>
        <div class='relative w-12 h-12 flex-shrink-0'>
            <img
                class='h-full w-full'
                :src="getImageOfItem(props.stack.item)"
            />
            <div class='flex absolute bottom-0 right-0 h-1 w-full justify-center'>
                <div class='h-1/2 w-1/2 rounded-sm'>
                    <div
                        class='h-full rounded-sm'
                        :style="durabilityBarStyle"
                    />
                </div>
            </div>
        </div>

        <div class='flex flex-col justify-between w-full h-full'>
            <div class='flex flex-row justify-between'>
                    <span class='text-sm text-stone-50'>
                        {props.stack.item.displayName}
                    </span>
                <div class='flex gap-1 items-baseline'>
                        <span class='text-sm text-stone-500'>
                            {display(props.stack.size)}
                        </span>
                    <span class='text-xs text-stone-500'>
                            {perSecond}
                        </span>
                </div>
            </div>

            <div class='flex flex-row justify-between'>
                    <span class='text-sm text-stone-50'>
                        {props.stack.durability !== undefined
                            ? 'Durability'
                            : ''}
                    </span>
                <span class='text-sm text-stone-500'>
                        {durabilityDisplayedValue(props.stack)}
                    </span>
            </div>
        </div>
    </Card>
</template>

<style scoped>

</style>