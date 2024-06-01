<script setup lang="ts">

import Sections from "@/shared/models/sections";
import { Button } from "@/shared/ui/button";

const props = defineProps<{
    setSection: (section: Sections) => void
}>()


</script>

<template>
    <div class='flex flex-col w-64 flex-none m-2 gap-2'>
        <Button
            class='w-full'
            @click="() => props.setSection(Sections.FOREST)"
        >
        Forest
        </Button>
        <Button
            class='w-full'
            @click="() => props.setSection(Sections.MINE)"
        >
        Mine
        </Button>
        <Button
            class='w-full'
            @click="() => props.setSection(Sections.CRAFT)"
        >
        Craft
        </Button>
        <Button
            class='w-full'
            @click="() => props.setSection(Sections.VILLAGE)"
        >
        Village
        </Button>
    </div>
</template>

<style scoped>

</style>