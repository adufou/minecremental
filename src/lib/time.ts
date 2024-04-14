const NB_MILLISECONDS = 1000
const NB_SECONDS = 60
const NB_MINUTES = 60
const NB_HOURS = 24
const NB_DAYS = 30
const NB_MONTHS = 12

export enum TimeUnitsDuration {
    MILLISECONDS = 1,
    SECONDS = NB_MILLISECONDS,
    MINUTES = NB_SECONDS * NB_MILLISECONDS,
    HOURS = NB_MINUTES * NB_SECONDS * NB_MILLISECONDS,
    DAYS = NB_HOURS * NB_MINUTES * NB_SECONDS * NB_MILLISECONDS,
    MONTHS = NB_DAYS * NB_HOURS * NB_MINUTES * NB_SECONDS * NB_MILLISECONDS,
    YEARS = NB_MONTHS * NB_DAYS * NB_HOURS * NB_MINUTES * NB_SECONDS * NB_MILLISECONDS,
}

export enum TimeUnits {
    MILLISECONDS = 'ms',
    SECONDS = 's',
    MINUTES = 'm',
    HOURS = 'h',
    DAYS = 'd',
    MONTHS = 'mo',
    YEARS = 'y',
}

type Time = {
    years: number | undefined,
    months: number | undefined,
    days: number | undefined,
    hours: number | undefined,
    minutes: number | undefined,
    seconds: number | undefined,
    milliseconds: number | undefined,
}

const threeGreaterTimeValues = (timeValues: Time) : {
    unit: TimeUnits,
    value: number,
}[] => {
    const NB_GREATER_VALUES = 3

    const greaterTimeValues: {
        unit: TimeUnits,
        value: number,
    }[] = []

    // Years
    if (timeValues.years) {
        greaterTimeValues.push({
            unit: TimeUnits.YEARS,
            value: timeValues.years,
        })
    }

    // Months
    if (timeValues.months && greaterTimeValues.length < NB_GREATER_VALUES) {
        greaterTimeValues.push({
            unit: TimeUnits.MONTHS,
            value: timeValues.months,
        })
    }

    // Days
    if (timeValues.days && greaterTimeValues.length < NB_GREATER_VALUES) {
        greaterTimeValues.push({
            unit: TimeUnits.DAYS,
            value: timeValues.days,
        })
    }

    // Hours
    if (timeValues.hours && greaterTimeValues.length < NB_GREATER_VALUES) {
        greaterTimeValues.push({
            unit: TimeUnits.HOURS,
            value: timeValues.hours,
        })
    }

    // Minutes
    if (timeValues.minutes && greaterTimeValues.length < NB_GREATER_VALUES) {
        greaterTimeValues.push({
            unit: TimeUnits.MINUTES,
            value: timeValues.minutes,
        })
    }

    // Seconds
    if (timeValues.seconds && greaterTimeValues.length < NB_GREATER_VALUES) {
        greaterTimeValues.push({
            unit: TimeUnits.SECONDS,
            value: timeValues.seconds,
        })
    }

    // Milliseconds
    if (timeValues.milliseconds && greaterTimeValues.length < NB_GREATER_VALUES) {
        greaterTimeValues.push({
            unit: TimeUnits.MILLISECONDS,
            value: timeValues.milliseconds,
        })
    }

    return greaterTimeValues;
}

export const displayTime = (time: number) => {
    let displayedTime = '';

    if (time === 0) {
        return displayedTime;
    }

    // Getting the time values
    const resultTime: Time = {
        years: undefined,
        months: undefined,
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined,
        milliseconds: undefined,
    };

    let remainingTime = time;

    resultTime.milliseconds = time % NB_MILLISECONDS;
    remainingTime = Math.floor(remainingTime / NB_MILLISECONDS);

    resultTime.seconds = remainingTime % NB_SECONDS;
    remainingTime = Math.floor(remainingTime / NB_SECONDS);

    resultTime.minutes = remainingTime % NB_MINUTES;
    remainingTime = Math.floor(remainingTime / NB_MINUTES);

    resultTime.hours = remainingTime % NB_HOURS;
    remainingTime = Math.floor(remainingTime / NB_HOURS);

    resultTime.days = remainingTime % NB_DAYS;
    remainingTime = Math.floor(remainingTime / NB_DAYS);

    resultTime.months = remainingTime % NB_MONTHS;
    remainingTime = Math.floor(remainingTime / NB_MONTHS);

    resultTime.years = remainingTime;

    // Setting the resulted displayed time

    const threeGreater = threeGreaterTimeValues(resultTime);

    threeGreater.forEach(unitValue => {
        if (displayedTime !== '') {
            displayedTime += ' ';
        }

        displayedTime += `${unitValue.value}${unitValue.unit}`;
    })

    return displayedTime;
}