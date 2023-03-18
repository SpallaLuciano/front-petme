import { compareDesc } from 'date-fns';
import { Visit } from '../interfaces';

export const sortByNewest = (a: string, b: string) => {
  if (a < b) {
    return 1;
  }
  if (b < a) {
    return -1;
  }
  return 0;
};

export const sortByOldest = (a: string, b: string) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
};

export const sortVisitsByDate = (a: Visit, b: Visit) => {
  const aDate = new Date(a.datetime);
  const bDate = new Date(b.datetime);

  return compareDesc(aDate, bDate);
};
