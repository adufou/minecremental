<script setup lang="ts">
import CraftItem from '@/modules/Craft/components/CraftItem.vue';
import ItemsRecipes from '@/shared/constants/items-recipes';
import { Separator } from '@/shared/ui/separator';
</script>

<template>
    <div class="flex flex-col w-full h-full p-2 gap-2">
        <div
            class="flex flex-col gap-2"
            v-for="[key, value] in Object.entries(ItemsRecipes)"
            :key="key"
        >
            <CraftItem :itemRecipe="value" />
            <Separator />
        </div>
    </div>
</template>

<style scoped></style>
