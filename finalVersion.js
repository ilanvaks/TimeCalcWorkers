const START_DATE = new Date('2013-01-01');
const END_DATE = new Date('2023-12-31');
const UNIT = 'hour'; // can be 'hour', 'day', 'month', 'year'

const weekends = [0, 6]; // 0: Sunday, 6: Saturday

// Function to calculate working days, considering partial days
function getWorkingDays(startDate, endDate) {
    if (endDate < startDate) {
        return -1; // Return -1 if end date is before start date
    }

    let totalHours = 0;
    
    for (let day = new Date(startDate); day < endDate; day.setDate(day.getDate() + 1)) {
        if (!weekends.includes(day.getDay())) {
            // For whole days, add 24 hours
            totalHours += 24;
        }
    }

    // Adjust for partial days
    if (!weekends.includes(startDate.getDay())) {
        totalHours += (24 - startDate.getHours());
    }
    if (!weekends.includes(endDate.getDay())) {
        totalHours -= (24 - endDate.getHours());
    }

    return totalHours / 24; // Convert hours back to days
}

// Function to calculate time difference based on unit
function calculateTimeDifference(unit, startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let reverse = end < start;
    if (reverse) {
        [start, end] = [end, start]; // Swap start and end dates if end date is before start date
    }
    let difference = 0;

    switch (unit.toLowerCase()) {
        case 'year':
            while (start <= end) {
                start.setFullYear(start.getFullYear() + 1);
                if (start < end || start.toDateString() === end.toDateString()) {
                    difference++;
                }
            }
            break;
        case 'month':
            while (start <= end) {
                start.setMonth(start.getMonth() + 1);
                if (start < end || start.toDateString() === end.toDateString()) {
                    difference++;
                }
            }
            break;
        case 'day':
            difference = getWorkingDays(start, end);
            break;
        case 'hour':
            difference = getWorkingDays(start, end) * 24; // Now counts actual hours
            break;
        default:
            console.error('Invalid unit. Supported units: year, month, day, hour');
            return null;
    }

    return reverse ? -difference : difference;
}

console.log("Test 1 - Days:", calculateTimeDifference('day', '2013-01-01', '2023-12-31'));
console.log("Test 2 - Hours:", calculateTimeDifference('hour', '2013-01-01', '2023-12-31'));
console.log("Test 3 - Months:", calculateTimeDifference('month', '2013-01-01', '2023-12-31'));
console.log("Test 4 - Years:", calculateTimeDifference('year', '2013-01-01', '2023-12-31'));
console.log("Test 5 - End Date Before Start Date:", calculateTimeDifference('day', '2023-12-31', '2013-01-01'));
console.log(calculateTimeDifference('day', '2013-01-01', '2023-12-31'));
