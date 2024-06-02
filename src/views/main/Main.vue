<script setup lang="ts">

import Inventory from "@/modules/Inventory/Inventory.vue";
import Sidebar from "@/modules/Sidebar/Sidebar.vue";
import StatusBar from "@/modules/StatusBar/StatusBar.vue";
import Sections from "@/shared/models/sections";
import { Separator } from "@/shared/ui/separator";
import MainCard from "@/views/main/components/MainCard.vue";
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
            <MainCard :section="currentSection" />
            <Inventory />
        </div>
    </div>
</template>

<style scoped>

</style>