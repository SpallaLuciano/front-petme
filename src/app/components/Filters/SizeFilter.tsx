import { FC } from 'react';
import { PetSize } from '../../enums';
import { removeFilterSize, updateSizeFilter, useAppDispatch, useAppSelector } from '../../state';
import { CheckBox } from './CheckBox';

export const SizeFilter: FC = () => {
  const dispatch = useAppDispatch();
  const size = useAppSelector((state) => state.pet.filters.size);

  return (
    <div>
      {Object.keys(PetSize).map((key) => {
        const value = PetSize[key as keyof typeof PetSize];
        return (
          <CheckBox
            value={size.includes(value)}
            key={key}
            label={value}
            onClick={(event) => {
              if (event.target.checked) {
                dispatch(updateSizeFilter(value));
              } else {
                dispatch(removeFilterSize(value));
              }
            }}
          />
        );
      })}
    </div>
  );
};
