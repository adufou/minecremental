export default function treeSliceMethods() {

    const chopProgress = (payload: {progress: number, chopPerTick: number, nbTick: number}) => {
        let newProgress = payload.progress + payload.chopPerTick * payload.nbTick;
        let nbChopped = 0;

        if (newProgress >= 1) {
            nbChopped = Math.floor(newProgress);
            // For number precision TODO: improve
            newProgress = ((newProgress * 1000) % 1000) / 1000;
        }

        return {
            nbChopped,
            newProgress,
        }
    }

    return {
        chopProgress
    }
}

