<script setup lang="ts">

import ProgressButton from "@/shared/ui/ProgressButton.vue";
import {computed} from "vue";
import { Separator} from "@/shared/ui/separator";
import {useForestStore} from "@/modules/Forest/store/forest.store";
import {Items} from "@/shared/constants/items";

const forestStore = useForestStore();

const progress = computed(() => forestStore.chopProgress)

const chopTree = () => {
    forestStore.chopByClick(Items.OAK_LOG)
}
</script>

<template>
    <div class='flex flex-col gap-2'>
        <div class='flex flex-row gap-2 h-11'>
            <ProgressButton
                :onClick="chopTree"
                :progress="progress"
            >
                Chop
            </ProgressButton>
            <Separator orientation='vertical' />
            <div class='flex flex-col items-end w-24 '>
                <p>{{ progress.toFixed(2) }}%</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>