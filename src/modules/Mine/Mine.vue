<script setup lang="ts">
import Depth from '@/modules/Mine/components/Depth.vue';
import MineProgressButton from '@/modules/Mine/components/MineProgressButton.vue';
import { UiSeparator } from '@/shared/ui/separator';
</script>

<template>
    <div class="flex flex-col p-2 gap-2 w-full h-full">
        <Depth />
        <UiSeparator />
        <MineProgressButton />
        <UiSeparator />
    </div>
</template>

<style scoped></style>
