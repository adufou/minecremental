<script setup lang="ts">

import {computed} from "vue";
import { Button} from "@/shared/ui/button";

const props = defineProps<{
    onClick: () => void
    progress: number
}>()

const backgroundStyle = computed<{ width: string }>(() => {
    return {
        width: `${props.progress}%`
    }
})
</script>

<template>
    <div class='w-full relative'>
        <div
            class='h-full rounded-md bg-lime-700 absolute'
            :style="backgroundStyle"
        />
        <div class='w-full rounded-md p-1 relative'>
            <Button
                class='w-full'
                variant='ghost'
                @click="props.onClick"
            >
                <slot />
            </Button>
        </div>
    </div>
</template>

<style scoped>

</style>