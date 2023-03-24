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
import { ApliedVaccineInput } from '../../inputs';
import { updateVaccineHealth, useAppDispatch, useAppSelector } from '../../state';
import { vaccinesValidationSchema } from '../../validation-schema/health';

export const VaccineForm: FC<{ petId: number; onClose: () => void; vaccineId?: number }> = ({
  petId,
  onClose,
  vaccineId
}) => {
  const dispatch = useAppDispatch();
  const { vaccines, currentPetKind, apliedVaccines } = useAppSelector((state) => {
    const petKind = state.pet.pets[petId].kind;
    const vaccines = state.health.vaccines;
    const apliedVaccines = state.health.health[petId].vaccines;

    return { vaccines, currentPetKind: petKind, apliedVaccines };
  });
  const apliedVaccine = apliedVaccines.find((vac) => vac.id === vaccineId);

  const [vaccine, setVaccine] = useState<undefined | number>(apliedVaccine?.id);
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
  } = useForm<ApliedVaccineInput>({
    resolver: yupResolver(vaccinesValidationSchema),
    defaultValues: {
      petId: petId,
      vaccineId: vaccine,
      date: apliedVaccine?.date || null
    }
  });

  const itemsVaccines = vaccines.map(({ id, name, petKind }) => {
    if (
      petKind !== currentPetKind ||
      apliedVaccines.find((vac) => vac.id === id && vac.id !== vaccineId)
    ) {
      return undefined;
    }

    return (
      <MenuItem key={id} value={id}>
        {name}
      </MenuItem>
    );
  });

  const onSubmit = (input: ApliedVaccineInput) => {
    if (vaccine) {
      dispatch(updateVaccineHealth({ ...input, vaccineId: vaccine }));
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
          disabled={!!vaccineId}
          onChange={(e) => setVaccine(Number(e.target.value))}
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
