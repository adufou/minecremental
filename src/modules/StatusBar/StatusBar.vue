<script setup lang="ts">
import Devtools from '@/modules/Devtools/Devtools.vue';
import ToggleTheme from '@/modules/StatusBar/components/ToggleTheme.vue';
import { UiSeparator } from '@/shared/ui/separator';
</script>

<template>
    <div class="flex flex-row justify-between w-full p-2">
        <div>
            <ToggleTheme />
        </div>
        <div class="flex flex-row">
            <UiSeparator orientation="vertical" />
            <Devtools />
        </div>
    </div>
</template>

<style scoped></style>
