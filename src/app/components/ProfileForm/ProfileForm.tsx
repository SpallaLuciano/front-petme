import { Dispatch, FC, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormHelperText, Grid, TextField } from '@mui/material';
import { profileUpdateSchema } from '../../validation-schema';
import style from './ProfileForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../state';
import { ProfileFormInput } from '../../inputs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { updateProfile } from '../../state/profile/profile.action-creators';

interface Props {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

export const ProfileForm: FC<Props> = ({ edit, setEdit }) => {
  const dispatch = useAppDispatch();

  const { name, lastname, birthdate } = useAppSelector((state) => {
    const profile = state.profile.profile;

    return {
      name: profile?.name || '',
      lastname: profile?.lastname || '',
      birthdate: profile?.birthdate || ''
    };
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<ProfileFormInput>({
    resolver: yupResolver(profileUpdateSchema),
    defaultValues: {
      name,
      lastname,
      birthdate
    }
  });

  const onSubmit = (values: ProfileFormInput) => {
    setEdit(false);
    dispatch(updateProfile(values));
  };

  const buttons = (
    <>
      <Button variant="contained" color="primary" type="submit">
        Guardar
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setEdit(false);
          reset();
        }}
      >
        Cancelar
      </Button>
    </>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item className={style.GridItem} xs={12} md={6} lg={4}>
          <TextField
            className={style.TextInput}
            disabled={!edit}
            id="name"
            label="Nombre"
            variant="outlined"
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name && errors.name.message}
          />
          <FormHelperText id="name-helper">No puede contener números ni, símbolos</FormHelperText>
        </Grid>
        <Grid item className={style.GridItem} xs={12} md={6} lg={4}>
          <TextField
            className={style.TextInput}
            disabled={!edit}
            id="lastname"
            label="Apellido"
            variant="outlined"
            {...register('lastname')}
            error={Boolean(errors.lastname)}
            helperText={errors.lastname && errors.lastname.message}
          />
          <FormHelperText id="lastname-helper">
            No puede contener números ni, símbolos
          </FormHelperText>
        </Grid>
        <Grid item className={style.GridItem} xs={12} md={6} lg={4}>
          <Controller
            name="birthdate"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disabled={!edit}
                    className={style.DatePicker}
                    onChange={onChange}
                    value={value}
                    inputFormat="dd-MM-yyyy"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              );
            }}
          />
        </Grid>
      </Grid>
      <div className={style.Buttons}>{edit ? buttons : null}</div>
    </form>
  );
};
