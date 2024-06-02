<script setup lang="ts">
import MineDepth from '@/modules/Mine/components/MineDepth.vue';
import { Separator } from '@/shared/ui/separator';

</script>

<template>
    <div class="flex flex-col p-2 gap-2 w-full h-full">
        <MineDepth :depth="0" />
        <Separator />
    </div>
</template>

<style scoped></style>
