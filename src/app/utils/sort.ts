import { Vaccination, Visit } from '../interfaces';

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

function getDateNumber(date: string) {
  return Number(date.split('T')[0].split('-').join(''));
}

export const sortVisitsByDateAsc = (a: Visit, b: Visit) => {
  const aNumber = getDateNumber(a.date);
  const bNumber = getDateNumber(b.date);

  return aNumber - bNumber;
};

export const sortVisitsByDateDesc = (a: Visit, b: Visit) => {
  const aNumber = getDateNumber(a.date);
  const bNumber = getDateNumber(b.date);

  return bNumber - aNumber;
};

export const sortVaccinationsByDateAsc = (a: Vaccination, b: Vaccination) => {
  const aNumber = getDateNumber(a.applicationDate);
  const bNumber = getDateNumber(b.applicationDate);

  return aNumber - bNumber;
};

export const sortVaccinationsByDateDesc = (a: Vaccination, b: Vaccination) => {
  const aNumber = getDateNumber(a.applicationDate);
  const bNumber = getDateNumber(b.applicationDate);

  return bNumber - aNumber;
};
