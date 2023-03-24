import { IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { getAge } from '../../utils';
import EditIcon from '@mui/icons-material/Edit';
import { updateWeightHealth, useAppDispatch, useAppSelector } from '../../state';
import { useForm } from 'react-hook-form';
import { WeightInput } from '../../inputs';
import { yupResolver } from '@hookform/resolvers/yup';
import { generalHealthValidationSchema } from '../../validation-schema';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

export const GeneralInfo: FC<{ petId: number }> = ({ petId }) => {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const { isCurrentUser, pet, health } = useAppSelector((state) => {
    const pet = state.pet.pets[petId];
    const isCurrentUser = pet.owner === state.auth.auth.user;
    const health = state.health.health[petId];

    return { pet, isCurrentUser, health };
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<WeightInput>({
    resolver: yupResolver(generalHealthValidationSchema),
    defaultValues: {
      weight: health.weight,
      petId
    }
  });

  const confirmCancel = (
    <>
      <IconButton
        type="submit"
        form="weight-form"
        style={{ backgroundColor: '#4caf50', color: '#fff' }}
      >
        <DoneIcon />
      </IconButton>{' '}
      <IconButton
        onClick={() => setEdit(false)}
        style={{ backgroundColor: '#f44336', color: '#fff' }}
      >
        <ClearIcon />
      </IconButton>
    </>
  );

  const updateWeight = (weightInput: WeightInput) => {
    dispatch(updateWeightHealth(weightInput));
    setEdit(false);
  };

  const editButton = (
    <IconButton onClick={() => setEdit(true)}>
      <EditIcon />
    </IconButton>
  );

  const age = (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
        Edad:
      </Typography>
      <Typography variant="body2">{getAge(pet.birthdate)}</Typography>
    </div>
  );

  const weight = (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
        Peso:
      </Typography>
      {edit ? (
        <form id="weight-form" onSubmit={handleSubmit(updateWeight)}>
          <OutlinedInput
            {...register('weight')}
            style={{ width: '80px' }}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            error={Boolean(errors.weight)}
          />
        </form>
      ) : (
        <Typography variant="body2">
          {health.weight ? `${health.weight} kg` : 'No cargado'}
        </Typography>
      )}
    </div>
  );

  return (
    <div>
      <Typography variant="h5">
        Información general {isCurrentUser ? (!edit ? editButton : confirmCancel) : undefined}
      </Typography>
      {age}
      {weight}
    </div>
  );
};
