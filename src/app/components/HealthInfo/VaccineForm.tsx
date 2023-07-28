import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateVaccinationInput } from '../../inputs';
import { useAppDispatch, useAppSelector } from '../../state';
import { vaccinesValidationSchema } from '../../validation-schema/health';
import { TypeId } from '../../interfaces';
import { addVaccineHealth, updateVaccineHealth } from '../../state/health/health.action-creators';

export const VaccineForm: FC<{ petId: TypeId; onClose: () => void; vaccinationId?: TypeId }> = ({
  petId,
  onClose,
  vaccinationId
}) => {
  const dispatch = useAppDispatch();
  const { vaccines, currentPetKind, health } = useAppSelector((state) => {
    const petKind = state.pet.pets[petId].kind;
    const vaccines = state.health.vaccines;
    const health = state.health.health[petId];

    return { vaccines, currentPetKind: petKind, health };
  });
  const apliedVaccine = health.vaccinations.find((vac) => vac.id === vaccinationId);

  const [vaccine, setVaccine] = useState<undefined | TypeId>(apliedVaccine?.vaccine.id);
  const [errorVaccine, setErrorVaccine] = useState<boolean>(false);
  const [errorDate, setErrorDate] = useState<string>('');

  const onClick = () => {
    if (!vaccine) {
      setErrorVaccine(true);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<CreateVaccinationInput>({
    resolver: yupResolver(vaccinesValidationSchema),
    defaultValues: {
      healthId: health.id,
      vaccineId: vaccine,
      applicationDate: apliedVaccine?.applicationDate || null
    }
  });

  const itemsVaccines = vaccines.map(({ id, name, petKind }) => {
    if (petKind !== currentPetKind) {
      return undefined;
    }

    const applied = !!health.vaccinations.find((vac) => {
      return vac.vaccine.id === id && vac.id !== vaccinationId;
    });

    return (
      <MenuItem key={id} value={id} disabled={applied}>
        {name}
      </MenuItem>
    );
  });

  const onSubmit = (input: CreateVaccinationInput) => {
    if (vaccinationId) {
      dispatch(
        updateVaccineHealth({
          vaccinationId,
          applicationDate: input.applicationDate,
          vaccineId: vaccine
        })
      );
      onClose();
    } else if (vaccine) {
      dispatch(
        addVaccineHealth({
          healthId: health.id,
          vaccineId: vaccine,
          applicationDate: input.applicationDate
        })
      );
      onClose();
    }
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl style={{ marginTop: '8px' }} fullWidth>
        <InputLabel id="vaccine">Tipo de vacuna</InputLabel>
        <Select
          labelId="vaccine"
          defaultValue={vaccine}
          value={vaccine}
          onChange={(e) => {
            setVaccine(e.target.value);
          }}
        >
          {itemsVaccines}
        </Select>
      </FormControl>
      {errorVaccine ? (
        <FormHelperText sx={{ color: '#d32f2f' }}>Seleccione una vacuna</FormHelperText>
      ) : undefined}
      <Controller
        name="applicationDate"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fecha de visita"
                value={value}
                onChange={(event) => {
                  try {
                    onChange(new Date(event || '').toISOString());
                    setErrorDate('');
                  } catch (error) {
                    setErrorDate('La fecha ingresada no es valida');
                  }
                }}
                disableFuture
                inputFormat="dd-MM-yyyy"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={Boolean(errors.applicationDate) || Boolean(errorDate)}
                    helperText={
                      (errors.applicationDate && errors.applicationDate.message) ||
                      (Boolean(errorDate) && errorDate)
                    }
                  />
                )}
              />
            </LocalizationProvider>
          );
        }}
      />
      <Button type="submit" onClick={onClick}>
        Guardar
      </Button>
      <Button onClick={handleClose}>Cancelar</Button>
    </form>
  );
};
