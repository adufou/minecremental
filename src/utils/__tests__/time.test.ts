import { displayTime } from '@/utils/time.ts';

enum TimeUnitsDurationMock {
    MILLISECONDS = 1,
    SECONDS = 1000,
    MINUTES = 60 * 1000,
    HOURS = 60 * 60 * 1000,
    DAYS = 24 * 60 * 60 * 1000,
    MONTHS = 30 * 24 * 60 * 60 * 1000,
    YEARS = 12 * 30 * 24 * 60 * 60 * 1000,
}

describe('time', () => {
    describe('displayTime', () => {
        it('displays nothing when time is 0', () => {
            // Arrange
            const time = 0;

            // Assert
            const displayedTime = displayTime(time);

            // Act
            expect(displayedTime).toBe('');
        });
        describe('milliseconds', () => {
            it('displays 1ms when time is 1 millisecond', () => {
                // Arrange
                const time = 1;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('1ms');
            });
            it('displays 10ms when time is 10 millisecond', () => {
                // Arrange
                const time = 10;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('10ms');
            });
            it('displays 59ms when time is 59 millisecond', () => {
                // Arrange
                const time = 59;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('59ms');
            });
        });
        describe('seconds', () => {
            it('displays 1s when time is 1 second', () => {
                // Arrange
                const time = 1 * TimeUnitsDurationMock.SECONDS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('1s');
            });
            it('displays 10s when time is 10 second', () => {
                // Arrange
                const time = 10 * TimeUnitsDurationMock.SECONDS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('10s');
            });
            it('displays 59s when time is 59 second', () => {
                // Arrange
                const time = 59 * TimeUnitsDurationMock.SECONDS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('59s');
            });
            describe('with lower units', () => {
                it('displays 1s 500ms when time is 1.5 second', () => {
                    // Arrange
                    const time = 1.5 * TimeUnitsDurationMock.SECONDS;

                    // Assert
                    const displayedTime = displayTime(time);

                    // Act
                    expect(displayedTime).toBe('1s 500ms');
                });
            });
        });
        describe('minutes', () => {
            it('displays 1m when time is 1 minute', () => {
                // Arrange
                const time = 1 * TimeUnitsDurationMock.MINUTES;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('1m');
            });
            it('displays 10m when time is 10 minutes', () => {
                // Arrange
                const time = 10 * TimeUnitsDurationMock.MINUTES;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('10m');
            });
            it('displays 59m when time is 59 minutes', () => {
                // Arrange
                const time = 59 * TimeUnitsDurationMock.MINUTES;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('59m');
            });
            describe('with lower units', () => {
                it('displays 1m 1s 500ms when time is 1 minute and 1.5 second', () => {
                    // Arrange
                    const time =
                        1 * TimeUnitsDurationMock.MINUTES +
                        1.5 * TimeUnitsDurationMock.SECONDS;

                    // Assert
                    const displayedTime = displayTime(time);

                    // Act
                    expect(displayedTime).toBe('1m 1s 500ms');
                });
            });
        });
        describe('hours', () => {
            it('displays 1h when time is 1 hour', () => {
                // Arrange
                const time = 1 * TimeUnitsDurationMock.HOURS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('1h');
            });
            it('displays 10h when time is 10 hours', () => {
                // Arrange
                const time = 10 * TimeUnitsDurationMock.HOURS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('10h');
            });
            it('displays 23h when time is 23 hours', () => {
                // Arrange
                const time = 23 * TimeUnitsDurationMock.HOURS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('23h');
            });
            describe('with lower units', () => {
                it('displays 1h 1s 500ms when time is 1 hour and 1.5 second', () => {
                    // Arrange
                    const time =
                        1 * TimeUnitsDurationMock.HOURS +
                        1.5 * TimeUnitsDurationMock.SECONDS;

                    // Assert
                    const displayedTime = displayTime(time);

                    // Act
                    expect(displayedTime).toBe('1h 1s 500ms');
                });
            });
        });
        describe('days', () => {
            it('displays 1d when time is 1 day', () => {
                // Arrange
                const time = 1 * TimeUnitsDurationMock.DAYS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('1d');
            });
            it('displays 10d when time is 10 days', () => {
                // Arrange
                const time = 10 * TimeUnitsDurationMock.DAYS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('10d');
            });
            it('displays 29d when time is 29 days', () => {
                // Arrange
                const time = 29 * TimeUnitsDurationMock.DAYS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('29d');
            });
            describe('with lower units', () => {
                it('displays 1d 1s 500ms when time is 1 day and 1.5 second', () => {
                    // Arrange
                    const time =
                        1 * TimeUnitsDurationMock.DAYS +
                        1.5 * TimeUnitsDurationMock.SECONDS;

                    // Assert
                    const displayedTime = displayTime(time);

                    // Act
                    expect(displayedTime).toBe('1d 1s 500ms');
                });
            });
        });
        describe('months', () => {
            it('displays 1mo when time is 1 month', () => {
                // Arrange
                const time = 1 * TimeUnitsDurationMock.MONTHS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('1mo');
            });
            it('displays 10mo when time is 10 months', () => {
                // Arrange
                const time = 10 * TimeUnitsDurationMock.MONTHS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('10mo');
            });
            it('displays 11mo when time is 11 months', () => {
                // Arrange
                const time = 11 * TimeUnitsDurationMock.MONTHS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('11mo');
            });
            describe('with lower units', () => {
                it('displays 1mo 1s 500ms when time is 1 month and 1.5 second', () => {
                    // Arrange
                    const time =
                        1 * TimeUnitsDurationMock.MONTHS +
                        1.5 * TimeUnitsDurationMock.SECONDS;

                    // Assert
                    const displayedTime = displayTime(time);

                    // Act
                    expect(displayedTime).toBe('1mo 1s 500ms');
                });
            });
        });
        describe('years', () => {
            it('displays 1y when time is 1 year', () => {
                // Arrange
                const time = 1 * TimeUnitsDurationMock.YEARS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('1y');
            });
            it('displays 10y when time is 10 years', () => {
                // Arrange
                const time = 10 * TimeUnitsDurationMock.YEARS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('10y');
            });
            it('displays 500y when time is 500 years', () => {
                // Arrange
                const time = 500 * TimeUnitsDurationMock.YEARS;

                // Assert
                const displayedTime = displayTime(time);

                // Act
                expect(displayedTime).toBe('500y');
            });
            describe('with lower units', () => {
                it('displays 1y 1s 500ms when time is 1 year and 1.5 second', () => {
                    // Arrange
                    const time =
                        1 * TimeUnitsDurationMock.YEARS +
                        1.5 * TimeUnitsDurationMock.SECONDS;

                    // Assert
                    const displayedTime = displayTime(time);

                    // Act
                    expect(displayedTime).toBe('1y 1s 500ms');
                });
            });
        });
    });
});
