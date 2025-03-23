import { postTranslation } from '@/constants/translation';
import { UserType } from '@/constants/user';
import { isEmployerByAccountType } from './signup';

export const calculateTimeAgo = (
  date: string,
  accountType: UserType | undefined,
): string => {
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
    return `${Math.floor(differenceMinutes)} ${postTranslation.minsAgo[isEmployerByAccountType(accountType)]}`;

  const differenceHours = differenceMinutes / MINUTES_IN_HOUR;
  if (differenceHours < HOURS_IN_DAY)
    return `${Math.floor(differenceHours)} ${postTranslation.hoursAgo[isEmployerByAccountType(accountType)]}`;

  const differenceDays = differenceHours / HOURS_IN_DAY;
  if (differenceDays < DAYS_IN_WEEK)
    return `${Math.floor(differenceDays)} ${postTranslation.daysAgo[isEmployerByAccountType(accountType)]}`;

  const differenceWeeks = differenceDays / DAYS_IN_WEEK;
  if (differenceWeeks < WEEKS_IN_MONTH)
    return `${Math.floor(differenceWeeks)} ${postTranslation.weeksAgo[isEmployerByAccountType(accountType)]}`;

  const differenceMonths = differenceDays / DAYS_IN_MONTH;
  if (differenceMonths < MONTHS_IN_YEAR)
    return `${Math.floor(differenceMonths)} ${postTranslation.monthsAgo[isEmployerByAccountType(accountType)]}`;

  const differenceYears = differenceDays / DAYS_IN_YEAR;
  return `${Math.floor(differenceYears)} ${postTranslation.yearsAgo[isEmployerByAccountType(accountType)]}`;
};
