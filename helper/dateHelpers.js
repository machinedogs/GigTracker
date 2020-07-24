// Checks if the 2 provided date objects are of the same day
export const datesAreOnSameDay = (first, second) => {
    return (first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate());
}