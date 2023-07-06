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
import { updateVaccineHealth, useAppDispatch, useAppSelector } from '../../state';
import { vaccinesValidationSchema } from '../../validation-schema/health';
import { TypeId } from '../../interfaces';

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

  const [vaccine, setVaccine] = useState<undefined | TypeId>(apliedVaccine?.id);
  const [errorVaccine, setErrorVaccine] = useState<boolean>(false);

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
      date: apliedVaccine?.applicationDate || null
    }
  });

  const itemsVaccines = vaccines.map(({ id, name, petKind }) => {
    if (
      petKind !== currentPetKind ||
      health.vaccinations.find((vac) => vac.vaccine.id === id && vac.id !== vaccinationId)
    ) {
      return undefined;
    }

    return (
      <MenuItem key={id} value={id}>
        {name}
      </MenuItem>
    );
  });

  const onSubmit = (input: CreateVaccinationInput) => {
    if (vaccinationId) {
      dispatch(
        updateVaccineHealth({ vaccinationId, date: input.date, vaccineId: input.vaccineId })
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
          disabled={!!apliedVaccine?.vaccine.id}
          onChange={(e) => setVaccine(e.target.value)}
        >
          {itemsVaccines}
        </Select>
      </FormControl>
      {errorVaccine ? (
        <FormHelperText sx={{ color: '#d32f2f' }}>Seleccione una vacuna</FormHelperText>
      ) : undefined}
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
                disableFuture
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
      <Button type="submit" onClick={onClick}>
        Guardar
      </Button>
      <Button onClick={handleClose}>Cancelar</Button>
    </form>
  );
};
