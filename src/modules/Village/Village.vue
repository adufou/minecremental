<script setup lang="ts">
import CraftBuild from '@/modules/Village/components/CraftBuild.vue';
import { useVillageStore } from '@/modules/Village/store/village.store';
import BuildingsRecipes from '@/shared/constants/buildings-recipes';
import { Separator } from '@/shared/ui/separator';
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
        <Separator />
        <div class="grid grid-cols-2 gap-2 w-full">
            <CraftBuild :buildingRecipe="BuildingsRecipes.OAK_HOUSE" />
        </div>
    </div>
</template>

<style scoped></style>
