import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';
import { OrderBy } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../state';
import { updateOrderBy } from '../../state/pet/pet.slice';

export const OrderByFilter: FC = () => {
  const orderBy = useAppSelector((state) => state.pet.filters.orderBy);
  const dispatch = useAppDispatch();

  const onChange = (event: SelectChangeEvent<OrderBy>) =>
    dispatch(updateOrderBy(event.target.value as OrderBy));

  return (
    <Select value={orderBy} onChange={onChange}>
      {Object.keys(OrderBy).map((key) => {
        const value = OrderBy[key as keyof typeof OrderBy];
        return (
          <MenuItem key={key} value={value}>
            {value}
          </MenuItem>
        );
      })}
    </Select>
  );
};
