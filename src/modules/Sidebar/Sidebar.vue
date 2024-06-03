<script setup lang="ts">
import Sections from '@/shared/models/sections';
import { UiButton } from '@/shared/ui/button';

const props = defineProps<{
    setSection: (section: Sections) => void;
}>();
</script>

<template>
    <div class="flex flex-col w-64 flex-none m-2 gap-2">
        <UiButton
            class="w-full"
            @click="() => props.setSection(Sections.FOREST)"
        >
            Forest
        </UiButton>
        <UiButton
            class="w-full"
            @click="() => props.setSection(Sections.MINE)"
        >
            Mine
        </UiButton>
        <UiButton
            class="w-full"
            @click="() => props.setSection(Sections.FOUNDRY)"
        >
            Foundry
        </UiButton>
        <UiButton
            class="w-full"
            @click="() => props.setSection(Sections.CRAFT)"
        >
            Craft
        </UiButton>
        <UiButton
            class="w-full"
            @click="() => props.setSection(Sections.VILLAGE)"
        >
            Village
        </UiButton>
    </div>
</template>

<style scoped></style>
