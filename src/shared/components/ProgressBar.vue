<script setup lang="ts">
const COLORS = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500',
    teal: 'bg-teal-500',
    gray: 'bg-gray-500',
    white: 'bg-white',
};

const props = withDefaults(
    defineProps<{
        value: number;
        color?: keyof typeof COLORS;
    }>(),
    {
        value: 50,
        color: 'green',
    },
);
</script>

<template>
    <div class="w-full h-2">
        <div
            :class="`h-full rounded ${COLORS[props.color]}`"
            :style="{ width: `${props.value}%` }"
        />
    </div>
</template>

<style scoped></style>
