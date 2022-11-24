import { FC } from 'react';
import { PetGender } from '../../enums';
import {
  removeFilterGender,
  updateGenderFilter,
  useAppDispatch,
  useAppSelector,
} from '../../state';
import { CheckBox } from './CheckBox';
import style from './Filters.module.scss';

export const GenderFilter: FC = () => {
  const dispatch = useAppDispatch();
  const gender = useAppSelector((state) => state.pet.filters.gender);

  return <div className={style.Container}>
    { (Object.keys(PetGender)).map((key) => {
      const value = PetGender[key as keyof typeof PetGender];
      return (
        <CheckBox
          key={key}
          value={gender.includes(value)}
          label={value}
          onClick={(event) => {
            if (event.target.checked) {
              dispatch(updateGenderFilter(value));
            } else {
              dispatch(removeFilterGender(value));
            }
          }}
        />
      );
    }) }
  </div>;
};
