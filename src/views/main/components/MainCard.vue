<script setup lang="ts">
import Forest from '@/modules/Forest/Forest.vue';
import Mine from '@/modules/Mine/Mine.vue';
import Sections from '@/shared/models/sections';
import { Card } from '@/shared/ui/card';

const props = defineProps<{
    section: Sections;
}>();

</script>

<template>
    <div class="flex flex-auto m-2">
        <Card class="flex flex-auto">
            <Forest v-if="props.section === Sections.FOREST" />
            <Mine v-if="props.section === Sections.MINE" />
        </Card>
    </div>
</template>

<style scoped></style>
