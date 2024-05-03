import { DateTime } from 'luxon';

/**
 * Returns a human-readable representation of the time difference between the input date and the current date.
 * @param date - The input date in string format.
 * @returns A string representing the time difference between the input date and the current date.
 */
export default function getTimeInGoodWay(date: string): string {
    const inputDate: DateTime = DateTime.fromISO(date);
    const now: DateTime = DateTime.now();
    const diff: number = now.diff(inputDate, ['days']).days;

    if (diff < 1) {
        return inputDate.toLocaleString(DateTime.TIME_SIMPLE);
    } else if (diff < 7) {
        return 'This week';
    } else if (inputDate.hasSame(now, 'month')) {
        return 'This month';
    } else if (inputDate.hasSame(now, 'year')) {
        return 'This year';
    } else {
        return inputDate.toFormat('MMMM dd, yyyy');
    }
}

// Example usage
// const createdAt: string = "2024-04-26T16:56:43.357Z";
// const time: string = getTimeInGoodWay(createdAt);
// console.log(time); // Output: "April 26, 2024"
