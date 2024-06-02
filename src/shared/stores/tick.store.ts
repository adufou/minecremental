import type { TickFunction } from '@/shared/models/tickFunction';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTickStore = defineStore('tick', () => {
    /* Private */
    const gameLoop = (lastTick?: Date) => {
        const now = new Date();

        if (lastTick) {
            const elapsedTime = now.getTime() - lastTick.getTime();
            tickFunctions.value.forEach((callback) => callback(elapsedTime));

            elapsed.value += elapsedTime;
        }
        requestAnimationFrame(() => gameLoop(now));
    };

    /* Public */
    const elapsed = ref<number>(0);

    const tickFunctions = ref<TickFunction[]>([]);

    const addTickFunction = (tickFunction: TickFunction) => {
        tickFunctions.value.push(tickFunction);
    };

    const removeTickFunction = (tickFunction: TickFunction) => {
        const index = tickFunctions.value.indexOf(tickFunction);
        if (index !== -1) {
            tickFunctions.value.splice(index, 1);
        }
    };

    const start = () => {
        if (!elapsed.value) {
            gameLoop();
        }
    };

    return {
        addTickFunction,
        elapsed,
        removeTickFunction,
        start,
    };
});
