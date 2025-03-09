export const calculateTimeAgo = (date: string): string => {
  const startTime = new Date(date).getTime();

  if (isNaN(startTime)) return '';

  const currentTime = new Date().getTime();

  const MILLISECONDS_IN_MINUTE = 1000 * 60;
  const MINUTES_IN_HOUR = 60;
  const HOURS_IN_DAY = 24;
  const DAYS_IN_WEEK = 7;
  const DAYS_IN_MONTH = 30;
  const DAYS_IN_YEAR = 365;
  const WEEKS_IN_MONTH = 4;
  const MONTHS_IN_YEAR = 12;

  const differenceMilliseconds = currentTime - startTime;
  const differenceMinutes = differenceMilliseconds / MILLISECONDS_IN_MINUTE;
  if (differenceMinutes < MINUTES_IN_HOUR)
    return `${Math.floor(differenceMinutes)} mins ago`;

  const differenceHours = differenceMinutes / MINUTES_IN_HOUR;
  if (differenceHours < HOURS_IN_DAY)
    return `${Math.floor(differenceHours)} hours ago`;

  const differenceDays = differenceHours / HOURS_IN_DAY;
  if (differenceDays < DAYS_IN_WEEK)
    return `${Math.floor(differenceDays)} days ago`;

  const differenceWeeks = differenceHours / DAYS_IN_WEEK;
  if (differenceWeeks < WEEKS_IN_MONTH)
    return `${Math.floor(differenceWeeks)} weeks ago`;

  const differenceMonths = differenceDays / DAYS_IN_MONTH;
  if (differenceMonths < MONTHS_IN_YEAR)
    return `${Math.floor(differenceMonths)} months ago`;

  const differenceYears = differenceDays / DAYS_IN_YEAR;
  return `${Math.floor(differenceYears)} years ago`;
};
