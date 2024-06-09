<script setup lang="ts">
import { useForestStore } from '@/modules/Forest/store/forest.store';
import { useFoundryStore } from '@/modules/Foundry/store/foundry.store';
import { useMineStore } from '@/modules/Mine/store/mine.store';
import { Items } from '@/shared/constants/items';
import { useTickStore } from '@/shared/stores/tick.store';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

// TEMP STORES
const forestStore = useForestStore();
const foundryStore = useFoundryStore();
const mineStore = useMineStore();

const tickStore = useTickStore();

// TODO: a composable to handle the function to call each tick
tickStore.addTickFunction((elapsedTime: number) =>
    forestStore.chopByVillager(elapsedTime, Items.OAK_LOG),
);
tickStore.addTickFunction((elapsedTime: number) =>
    mineStore.mineByVillager(elapsedTime),
);
tickStore.addTickFunction((elapsedTime: number) =>
    foundryStore.smelt(elapsedTime),
);

onMounted(() => {
    tickStore.start();
});
</script>

<template>
    <RouterView />
</template>

<style>
html,
body {
    height: 100%;
    width: 100%;
}

#app {
    height: 100%;
    width: 100%;
}
</style>
