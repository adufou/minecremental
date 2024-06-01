<script setup lang="ts">

import StatusBar from "@/modules/StatusBar/StatusBar.vue";
import Sidebar from "@/modules/Sidebar/Sidebar.vue";
import MainCard from "@/views/main/components/MainCard.vue";
import PlayerInventory from "@/modules/PlayerInventory/PlayerInventory.vue";
import { Separator } from "@/shared/ui/separator";
import Sections from "@/shared/models/sections";
import {ref} from "vue";

const currentSection = ref(Sections.FOREST)

const setSection = (section: Sections) => {
    currentSection.value = section
}

</script>

<template>
    <div class='flex flex-col h-full w-full'>
        <StatusBar />

        <Separator />

        <div class='flex flex-row flex-auto'>
            <Sidebar :setSection="setSection" />
            <Separator
                orientation='vertical'
                className='h-full'
            />
            <MainCard section={section} />
            <PlayerInventory />
        </div>
    </div>
</template>

<style scoped>

</style>