import { Chip } from '@mui/material';
import { FC } from 'react';
import { PetGender, PetKind, PetSize } from '../../enums';
import {
  removeFilterGender,
  removeFilterKind,
  removeFilterSize,
  resetFilterAgeBetween,
  useAppDispatch,
  useAppSelector
} from '../../state';
import style from './FilterSummary.module.scss';

export const FilterSummary: FC = () => {
  const filters = useAppSelector((state) => state.pet.filters);
  const dispatch = useAppDispatch();

  const handleAge = () => dispatch(resetFilterAgeBetween());
  const handleGender = (value: string) => dispatch(removeFilterGender(value as PetGender));
  const handleKind = (value: string) => dispatch(removeFilterKind(value as PetKind));
  const handleSize = (value: string) => dispatch(removeFilterSize(value as PetSize));

  return <>
    <Chip
      className={style.Chip}
      label={`Desde ${filters.ageBetween[0]} hasta ${filters.ageBetween[1]} años`}
      onClick={handleAge}
    />
    <Chip
      label={filters.orderBy}
    />
    {
      filters.kind.map((value) =>
        <Chip
          key={value}
          className={style.Chip}
          label={value}
          onDelete={() => handleKind(value)}
        />
      )
    }
    {
      filters.gender.map((value) =>
        <Chip
          key={value}
          className={style.Chip}
          label={value}
          onDelete={() => handleGender(value)}
        />
      )
    }
    {
      filters.size.map((value) =>
        <Chip
          key={value}
          className={style.Chip}
          label={value}
          onDelete={() => handleSize(value)}
        />
      )
    }
  </>;
};
