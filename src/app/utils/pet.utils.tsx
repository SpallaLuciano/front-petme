import {
  Favorite,
  FavoriteBorder,
  Female,
  Male,
  QuestionMark,
} from '@mui/icons-material';
import { differenceInMonths, differenceInYears } from 'date-fns';
import { PetGender, PetKind, PetSize } from '../enums';

export const getAge = (stringBirthdate: string) => {
  const today = new Date();
  const birthdate = new Date(stringBirthdate);

  let diff = differenceInYears(today, birthdate);
  let unit = 'años';

  if (diff === 1) unit = 'año';
  if (diff < 1) {
    diff = differenceInMonths(today, birthdate);
    unit = 'meses';
  }
  if (diff === 1) unit = 'mes';

  return `${diff} ${unit}`;
};

export const getGenderIcon = (gender: PetGender) => {
  switch (gender) {
    case PetGender.FEMALE:
      return <Female />;
    case PetGender.MALE:
      return <Male />;
    default:
      return <QuestionMark />;
  }
};

export const getFavoriteIcon = (isFavorite: boolean) => {
  if (isFavorite) return <Favorite />;
  return <FavoriteBorder />;
};

export const getSizeKind = (kind: PetKind, size: PetSize) => {
  const sizeKind = `${getKind(kind)} ${getSize(size)}`;
  return sizeKind.charAt(0).toUpperCase() + sizeKind.substring(1).toLowerCase();
};

const getSize = (size: PetSize) => {
  switch (size) {
    case PetSize.LARGE:
      return 'GRANDE';
    case PetSize.MEDIUM:
      return 'MEDIANO';
    case PetSize.SMALL:
      return 'PEQUEÑO';
    case PetSize.UNKNOWN:
      return '';
  }
};

const getKind = (kind: PetKind) => {
  switch (kind) {
    case PetKind.CAT:
      return 'GATO';
    case PetKind.DOG:
      return 'PERRO';
  }
};
