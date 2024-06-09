<script setup lang="ts">
import ProgressBar from '@/shared/components/ProgressBar.vue';
import { Items } from '@/shared/constants/items';
import { UiCard } from '@/shared/ui/card';
import { UiSeparator } from '@/shared/ui/separator';
import { getImageOfItem } from '@/utils/image';
import { Icon } from '@iconify/vue';
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-2">
            <div class="flex flex-col gap-2">
                <!-- TODO: Fuel selector -->
                <UiCard class="h-16 w-16 p-1"
                    ><img :src="getImageOfItem(Items.COAL)"
                /></UiCard>
                <ProgressBar :value="50" />
            </div>
            <UiSeparator :orientation="'vertical'" />
            <div class="flex flex-col w-full gap-2">
                <div
                    class="flex flex-row w-full gap-2 justify-around items-center"
                >
                    <!-- TODO: Input selector -->
                    <UiCard class="h-16 w-16 p-1"
                        ><img :src="getImageOfItem(Items.IRON_ORE)"
                    /></UiCard>
                    <Icon
                        icon="radix-icons:arrow-right"
                        class="h-8 w-8"
                    />
                    <UiCard class="h-16 w-16 p-1"
                        ><img :src="getImageOfItem(Items.IRON_INGOT)"
                    /></UiCard>
                </div>
                <ProgressBar :value="50" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
