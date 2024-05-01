/**
 * Parses the given timestamp and returns a formatted date and time string.
 * @param timestamp The timestamp string in ISO 8601 format.
 * @returns A formatted string representing the date and time.
 */
export default function formatTimestamp(timestamp: string): string {
    // Parse the timestamp
    const dateObj: Date = new Date(timestamp);

    // Extract date components
    const year: number = dateObj.getFullYear();
    const month: string = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Months are 0-indexed
    const day: string = ('0' + dateObj.getDate()).slice(-2);

    // Extract time components
    const hours: string = ('0' + dateObj.getHours()).slice(-2);
    const minutes: string = ('0' + dateObj.getMinutes()).slice(-2);
    const seconds: string = ('0' + dateObj.getSeconds()).slice(-2);

    // Return formatted date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Test the function
// const timestamp: string = "2024-04-26T02:43:27.075Z";
// const formattedTimestamp: string = formatTimestamp(timestamp);
// console.log(formattedTimestamp); // Output: "2024-04-26 02:43:27"
