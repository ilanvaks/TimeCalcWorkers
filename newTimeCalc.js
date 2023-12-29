const START_DATE = new Date('2013-01-01');
const END_DATE = new Date('2023-12-31');
const UNIT = 'hour'; // can be 'hour', 'day', 'month', 'year'

const weekends = [0, 6]; // 0: Sunday, 6: Saturday

// Calculate the difference in days, excluding weekends
function getWorkingDays(startDate, endDate) {
    let totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    let weekEndDays = 0;
    
    for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
        if (weekends.includes(day.getDay())) {
            weekEndDays++;
        }
    }

    return totalDays - weekEndDays;
}

// Calculate time difference based on the unit
function calculateTimeDifference(unit, startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let difference = 0;

    switch (unit.toLowerCase()) {
        case 'year':
            while (start < end) {
                start.setFullYear(start.getFullYear() + 1);
                if (start <= end) {
                    difference++;
                }
            }
            break;
        case 'month':
            while (start < end) {
                start.setMonth(start.getMonth() + 1);
                if (start <= end) {
                    difference++;
                }
            }
            break;
        case 'day':
            difference = getWorkingDays(start, end);
            break;
        case 'hour':
            difference = getWorkingDays(start, end) * 24;
            break;
        default:
            console.error('Invalid unit. Supported units: year, month, day, hour');
            return null;
    }

    return difference;
}


const result = calculateTimeDifference(UNIT, START_DATE, END_DATE);
console.log("Result:", result);

console.log("Days:", calculateTimeDifference('day', '2013-01-01', '2023-12-31'));
console.log("Hours:", calculateTimeDifference('hour', '2013-01-01', '2023-12-31'));
console.log("Months:", calculateTimeDifference('month', '2013-01-01', '2023-12-31'));
console.log("Years:", calculateTimeDifference('year', '2013-01-01', '2023-12-31'));