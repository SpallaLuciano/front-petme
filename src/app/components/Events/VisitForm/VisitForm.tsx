import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AddVisitInput } from '../../../inputs';
import { TypeId, Visit } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../state';
import { visitValidationSchema } from '../../../validation-schema';
import { VisitSchema } from '../../../validation-schema/health';
import style from './VisitForm.module.scss';
import { addVisitHealth, updateVisitHealth } from '../../../state/health/health.action-creators';

export const VisitForm: FC<{ visit?: Visit; onClose: () => void; petId?: TypeId }> = ({
  visit,
  onClose,
  petId
}) => {
  const dispatch = useAppDispatch();

  const [type, setType] = useState<string | null>(visit?.type.name || null);
  const [errorType, setErrorType] = useState<boolean>(false);
  const visitTypes = useAppSelector((state) => state.health.visitTypes);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<VisitSchema>({
    resolver: yupResolver(visitValidationSchema),
    defaultValues: {
      date: visit?.date.toISOString() || null,
      address: visit?.address,
      description: visit?.description,
      place: visit?.place
    }
  });

  const onClick = () => {
    if (!type) {
      setErrorType(true);
    }
  };

  const submitVisit = ({ date, ...input }: VisitSchema) => {
    if (date && type) {
      if (petId) {
        const addVisit: AddVisitInput = {
          petId,
          visit: {
            ...input,
            date,
            visitType: type
          }
        };

        dispatch(addVisitHealth(addVisit));
      } else if (visit) {
        dispatch(
          updateVisitHealth({
            visitId: visit.id,
            visitInput: {
              date,
              visitType: type,
              ...input
            }
          })
        );
      }
    }

    onClose();
  };

  const items = Object.values(visitTypes).map((value) => (
    <MenuItem key={value.name} value={value.name}>
      {value.label}
    </MenuItem>
  ));

  return (
    <form className={style.Form} onSubmit={handleSubmit(submitVisit)}>
      <FormControl fullWidth>
        <InputLabel id="visit-type">Tipo de visita</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          labelId="visit-type"
          label="Tipo de visita"
          error={errorType}
        >
          {items}
        </Select>
        {errorType ? (
          <FormHelperText sx={{ color: '#d32f2f' }}>Tipo es requerido</FormHelperText>
        ) : undefined}
      </FormControl>
      <FormControl fullWidth>
        <FormLabel>Descripción</FormLabel>
        <TextField
          fullWidth
          id="description"
          type="text"
          rows={4}
          multiline
          {...register('description')}
          error={Boolean(errors.description)}
          helperText={errors.description && errors.description.message}
        />
      </FormControl>
      <TextField
        fullWidth
        label="Lugar"
        id="place"
        type="text"
        variant="outlined"
        {...register('place')}
        error={Boolean(errors.place)}
        helperText={errors.place && errors.place.message}
      />
      <TextField
        fullWidth
        label="Dirección"
        id="address"
        type="text"
        variant="outlined"
        {...register('address')}
        error={Boolean(errors.address)}
        helperText={errors.address && errors.address.message}
      />
      <Controller
        name="date"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fecha de visita"
                value={value}
                onChange={onChange}
                inputFormat="dd-MM-yyyy"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={Boolean(errors.date)}
                    helperText={errors.date && errors.date.message}
                  />
                )}
              />
            </LocalizationProvider>
          );
        }}
      />
      <Button variant="contained" type="submit" onClick={onClick}>
        {visit ? 'Actualizar' : 'Crear'}
      </Button>
      <Button variant="contained" onClick={onClose}>
        Cancelar
      </Button>
    </form>
  );
};
