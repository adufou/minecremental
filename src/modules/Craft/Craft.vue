<script setup lang="ts">
import CraftItem from '@/modules/Craft/components/CraftItem.vue';
import ItemRecipes from '@/shared/constants/itemRecipes';
import { UiSeparator } from '@/shared/ui/separator';
</script>

<template>
    <div class="flex flex-col w-full h-full p-2 gap-2">
        <div
            class="flex flex-col gap-2"
            v-for="[key, value] in Object.entries(ItemRecipes)"
            :key="key"
        >
            <CraftItem :itemRecipe="value" />
            <UiSeparator />
        </div>
    </div>
</template>

<style scoped></style>
