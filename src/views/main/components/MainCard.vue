<script setup lang="ts">

import {Card} from "@/shared/ui/card";
import Sections from "@/shared/models/sections";
import Forest from "@/modules/Forest/Forest.vue";

const props = defineProps<{
    section: Sections
}>()

</script>

<template>
    <div class='flex flex-auto m-2'>
        <Card class='flex flex-auto'>
            <Forest v-if="props.section === Sections.FOREST" />
        </Card>
    </div>
</template>

<style scoped>

</style>