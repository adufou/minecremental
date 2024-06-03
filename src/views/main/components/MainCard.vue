<script setup lang="ts">
import Craft from '@/modules/Craft/Craft.vue';
import Forest from '@/modules/Forest/Forest.vue';
import Foundry from '@/modules/Foundry/Foundry.vue';
import Mine from '@/modules/Mine/Mine.vue';
import Village from '@/modules/Village/Village.vue';
import Sections from '@/shared/models/sections';
import { UiCard } from '@/shared/ui/card';

const props = defineProps<{
    section: Sections;
}>();
</script>

<template>
    <div class="flex flex-auto m-2">
        <UiCard class="flex flex-auto">
            <Forest v-if="props.section === Sections.FOREST" />
            <Mine v-if="props.section === Sections.MINE" />
            <Foundry v-if="props.section === Sections.FOUNDRY" />
            <Craft v-if="props.section === Sections.CRAFT" />
            <Village v-if="props.section === Sections.VILLAGE" />
        </UiCard>
    </div>
</template>

<style scoped></style>
