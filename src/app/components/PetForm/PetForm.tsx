import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PetGender, PetKind, PetSize } from '../../enums';
import { PetInput } from '../../inputs';
import { createPet, updatePet, useAppDispatch, useAppSelector } from '../../state';
import { petUpdateValidationSchema } from '../../validation-schema';
import style from './PetForm.module.scss';

interface Props {
  id?: number,
  onSave?: () => void,
  onCancel?: () => void
}

export const PetForm: FC<Props> = ({onSave, onCancel, id}) => {
  const dispatch = useAppDispatch();
  const pet = useAppSelector((state) => {
    const pet = id ? state.pet.pets[id] : null;
    return {
      name: pet?.name || '',
      gender: pet?.gender || PetGender.MALE,
      kind: pet?.kind || PetKind.DOG,
      size: pet?.size || PetSize.LARGE,
      birthdate: pet?.birthdate || ''
    };
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<PetInput>({
    resolver: yupResolver(petUpdateValidationSchema),
    defaultValues: pet
  });

  const onSubmit = (value: PetInput) => {
    if (onSave) onSave();
    if (id) {
      dispatch(updatePet({id, pet: value as Partial<PetInput>}));
    } else {
      dispatch(createPet(value));
    }
  };

  return <form onSubmit={handleSubmit(onSubmit)} className={style.Container} noValidate>
    <div className={style.Form}>
      <FormControl className={style.FormControl}>
        <TextField
          fullWidth
          label="Nombre"
          id="name"
          type="text"
          variant="filled"
          {...register('name')}
          error={Boolean(errors.name)}
          helperText={errors.name && errors.name.message}
        />
      </FormControl>
      <FormControl
        error={Boolean(errors.kind)}
      >
        <FormLabel id="kind-label">Especie</FormLabel>
        <Controller
          name="kind"
          control={control}
          render={({ field: { onChange, value } }) => 
            <RadioGroup
              className={style.RadioGroup}
              aria-labelledby="kind-label"
              onChange={onChange}
              value={value}
            >
              {Object.values(PetKind).map((value) =>
                <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
              )}
            </RadioGroup>
          }
        />
        <FormHelperText error={Boolean(errors.kind)}>
          {errors.kind && errors.kind.message}
        </FormHelperText>
      </FormControl>
      <FormControl
        error={Boolean(errors.gender)}
      >
        <FormLabel id="gender-label">Género</FormLabel>
        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange, value } }) => 
            <RadioGroup
              className={style.RadioGroup}
              aria-labelledby="gender-label"
              onChange={onChange}
              value={value}
            >
              {Object.values(PetGender).map((value) =>
                <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
              )}
            </RadioGroup>
          }
        />
        <FormHelperText error={Boolean(errors.gender)}>
          {errors.gender && errors.gender.message}
        </FormHelperText>
      </FormControl>
      <FormControl
        error={Boolean(errors.size)}
      >
        <FormLabel id="size-label">Tamaño</FormLabel>
        <Controller
          name="size"
          control={control}
          render={({ field: { onChange, value } }) => 
            <RadioGroup
              className={style.RadioGroup}
              aria-labelledby="size-label"
              onChange={onChange}
              value={value}
            >
              {Object.values(PetSize).map((value) =>
                <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
              )}
            </RadioGroup>
          }
        />
        <FormHelperText error={Boolean(errors.size)}>
          {errors.size && errors.size.message}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel id="birthdate-label">Fecha de nacimiento</FormLabel>
        <Controller
          name="birthdate"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disableFuture
                  className={style.DatePicker}
                  onChange={onChange}
                  value={value}
                  inputFormat='dd-MM-yyyy'
                  renderInput={(params) => <TextField
                    aria-labelledby='birthdate-labe'
                    {...params}
                  />}
                />
              </LocalizationProvider>
            );
          }}
        />
        <FormHelperText error={Boolean(errors.birthdate)}>
          {errors.birthdate && errors.birthdate.message}
        </FormHelperText>
      </FormControl>
      <Button type="submit">
        {id ? 'Actualizar' : 'Crear'}
      </Button>
      <Button onClick={() => {
        if (onCancel) onCancel();
        reset();
      }}>
        Cancelar
      </Button>
    </div>
  </form>;
};

PetForm.displayName = 'PetForm';

/**
 *     const newImages = watch('fileList');

  const imageItems = newImages ? Object.values(newImages).map((value, key) => 
    <ImageListItem key={key}>
      <img
        src={`${URL.createObjectURL(value)}`}
        srcSet={`${URL.createObjectURL(value)}`}
        alt={value.name}
        loading="lazy"
      />
    </ImageListItem>
  ) : [];
 * 
 * 
  const imageForm = id ? undefined :
    <>
      <FormControl className={style.Form}>
        <FormLabel id="images-label">Imagenes</FormLabel>
        <input
          aria-labelledby="images-label"
          accept="image/*"
          id="upload-photo"
          type="file"
          multiple
          {...register('fileList')}
        />
        <FormHelperText error={Boolean(errors.fileList)}>
          {errors.fileList && errors.fileList.message}
        </FormHelperText>
      </FormControl>
      <ImageList className={style.ImageList} variant="masonry" cols={5} gap={1}>
        {imageItems}
      </ImageList>
    </>;
 */