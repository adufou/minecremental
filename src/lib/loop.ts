const mainLoop = (
    setFirstTick: (firstTick: Date) => void,
    setLastTick: (lastTick: Date) => void,
    setTick: (tick: number) => void,
    setTickDurationMovingAverage1000: (tickMA1000: number) => void,
    currentTick: number = 0,
    lastTick: Date | undefined = undefined,
    tickDurationMovingAverage1000: number = 0,
) => {
    const newTick = currentTick + 1;
    setTick(newTick)

    const now = new Date();
    const elapsed = lastTick ? now.getTime() - lastTick.getTime() : 0;

    if (currentTick) {
        setFirstTick(now)
    }
    setLastTick(now)

    const movingAverageSamplePoints = Math.min(1000, currentTick)
    const newTickDurationMovingAverage1000 = (tickDurationMovingAverage1000 * movingAverageSamplePoints + elapsed) / (movingAverageSamplePoints + 1)

    setTickDurationMovingAverage1000(newTickDurationMovingAverage1000)

    requestAnimationFrame(() => mainLoop(
        setFirstTick,
        setLastTick,
        setTick,
        setTickDurationMovingAverage1000,
        newTick,
        now,
        newTickDurationMovingAverage1000
    ))
}

export default mainLoop