import { FC } from 'react';
import { PetKind } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../state';
import { CheckBox } from './CheckBox';
import { removeFilterKind, updateKindFilter } from '../../state/pet/pet.slice';

export const KindFilter: FC = () => {
  const dispatch = useAppDispatch();
  const kind = useAppSelector((state) => state.pet.filters.kind);

  return (
    <div>
      {Object.keys(PetKind).map((key) => {
        const value = PetKind[key as keyof typeof PetKind];
        return (
          <CheckBox
            key={key}
            value={kind.includes(value)}
            label={value}
            onClick={(event) => {
              if (event.target.checked) {
                dispatch(updateKindFilter(value));
              } else {
                dispatch(removeFilterKind(value));
              }
            }}
          />
        );
      })}
    </div>
  );
};
