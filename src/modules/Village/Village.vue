<script setup lang="ts">
import CraftBuild from '@/modules/Village/components/CraftBuild.vue';
import { useVillageStore } from '@/modules/Village/store/village.store';
import BuildingRecipes from '@/shared/constants/buildingRecipes';
import { UiSeparator } from '@/shared/ui/separator';
import { display } from '@/utils/numbers';

const villageStore = useVillageStore();
</script>

<template>
    <div class="flex flex-col w-full h-full gap-2 p-2">
        <div>
            <span class="text-xl">
                {{ display(villageStore.villagers) }} villager
            </span>
        </div>
        <UiSeparator />
        <div class="grid grid-cols-2 gap-2 w-full">
            <CraftBuild :buildingRecipe="BuildingRecipes.OAK_HOUSE" />
        </div>
    </div>
</template>

<style scoped></style>
