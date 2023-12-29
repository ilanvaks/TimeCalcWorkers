const START_DATE = new Date('2013-01-01');
const END_DATE = new Date('2023-12-31');
const UNIT = 'hour'; // can be HOUR, DAY, MONTH, YEAR

// helper function to round timedates to nearest hour
function roundToHour(d) {
    p = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.round(d.getTime() / p ) * p);
  }

// helper function to add hours to a datetime
function addHour(d, h) {
    r = new Date()
    r.setTime(d.getTime() + (h*60*60*1000));
    return r;
}

// test that user parameters are good, throw error otherwise:
if (START_DATE == null || END_DATE == null ) {
    return null;
}

const start_date = new Date(roundToHour(START_DATE));
const end_date = new Date(roundToHour(END_DATE));
const unit = UNIT;
const diffMilliseconds = Math.round(end_date - start_date, 0);
const diffhours = Math.round(diffMilliseconds / (60 * 60 * 1000), 0);
const weekends = [0, 6];

let weekendHours = 0;
let weekendMilliseconds = 0;
let finalDiffMilliseconds = new Date();

// figure out what date is the earliest and latest
if (start_date <= end_date){
    early_date = start_date;
    late_date = end_date;
}
else {
    early_date = end_date;
    late_date = start_date;
}

let dIter = new Date();
// iterate on hours and kick out the ones during weekends
for (let i = 0; i <= Math.abs(diffhours); i++) {
    dIter = addHour(early_date, i);
    const dayOfWeek = dIter.getDay();
    // Check if the current day is not a weekend
    if (weekends.includes(dayOfWeek)) {
        weekendHours++;
    }
}

weekendMilliseconds = weekendHours * 60 * 60 * 1000;

// calculate final difference without weekend hours in right sign
if (start_date <= end_date){
    finalDiffMilliseconds = diffMilliseconds - weekendMilliseconds;
}
else {
    finalDiffMilliseconds = diffMilliseconds + weekendMilliseconds;
}

// Convert the difference to the specified unit
var result = 0;
switch (unit.toLowerCase()) {
    case 'year':
        result = Math.round(finalDiffMilliseconds / (365.25 * 24 * 60 * 60 * 1000), 0);
        break;
    case 'month':
        result = Math.round(finalDiffMilliseconds / (30.44 * 24 * 60 * 60 * 1000), 0);
        break;
    case 'day':
        result = Math.round(finalDiffMilliseconds / (24 * 60 * 60 * 1000), 0);
        break;
    case 'hour':
        result = Math.round(finalDiffMilliseconds / (60 * 60 * 1000), 0);
        break;
    default:
        console.error('Invalid unit. Supported units: year, month, day, hour');
}
return result;




console.log("Days:", calculateTimeDifference('day', '2013-01-01', '2023-12-31'));
console.log("Hours:", calculateTimeDifference('hour', '2013-01-01', '2023-12-31'));
console.log("Months:", calculateTimeDifference('month', '2013-01-01', '2023-12-31'));
console.log("Years:", calculateTimeDifference('year', '2013-01-01', '2023-12-31'));
