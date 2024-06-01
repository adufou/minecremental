<script setup lang="ts">

import ToggleTheme from "@/modules/StatusBar/components/ToggleTheme.vue";
import Devtools from "@/modules/Devtools/Devtools.vue";
import { Separator } from "@/shared/ui/separator";

</script>

<template>
    <div class='flex flex-row justify-between w-full p-2'>
        <div>
            <ToggleTheme />
        </div>
        <div class='flex flex-row'>
            <Separator orientation='vertical' />
            <Devtools />
        </div>
    </div>
</template>

<style scoped>

</style>