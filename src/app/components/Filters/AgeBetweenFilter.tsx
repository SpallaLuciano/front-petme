import { Slider } from '@mui/material';
import { differenceInYears } from 'date-fns';
import { FC } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  updateAgeBetweenFilter
} from '../../state';
import style from './Filters.module.scss';

const ageValueText = (value: number) => {
  if (value === 1) {
    return `${value} año`;
  } else {
    return `${value} años`;
  }
};

export const AgeBetweenFilter: FC = () => {
  const dispatch = useAppDispatch();
  const { ageBetween, oldestAgeInYears } = useAppSelector((state) => ({
    ageBetween: state.pet.filters.ageBetween, 
    oldestAgeInYears: differenceInYears(new Date(), new Date(state.pet.oldestBirth))
  }));

  return <div className={style.Container}>
    <Slider
      valueLabelDisplay="auto"
      getAriaValueText={ageValueText}
      onChange={(e, value) => dispatch(updateAgeBetweenFilter(value as [number, number]))}
      value={ageBetween}
      max={oldestAgeInYears}
      min={0}
    />
  </div>;
};
