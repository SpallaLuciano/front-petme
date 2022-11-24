import { differenceInSeconds } from 'date-fns';

export const diffFromNow = (date: Date) => {
  return differenceInSeconds(date, new Date());
};
