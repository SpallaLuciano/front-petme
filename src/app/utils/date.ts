import { differenceInSeconds, format, isToday } from 'date-fns';

export const diffFromNow = (date: Date) => {
  return differenceInSeconds(date, new Date());
};

export const dateOrHour = (date: Date): string => {
  if (isToday(date)) {
    return format(date, 'HH:mm');
  } else {
    return format(date, 'yyyy-MM-dd');
  }
};
