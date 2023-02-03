import { FC } from 'react';
import { PetKind } from '../../enums';
import { removeFilterKind, updateKindFilter, useAppDispatch, useAppSelector } from '../../state';
import { CheckBox } from './CheckBox';

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
