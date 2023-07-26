import * as yup from 'yup';
import { PetGender, PetKind, PetSize } from '../enums';

export const petUpdateValidationSchema = yup.object({
  name: yup
    .string()
    .required('Nombre es requerido')
    .min(2, 'Debe contener al menos dos letras')
    .matches(/[a-zA-Z ]+/g, 'Solo puede contener letras y espacios')
    .matches(/^[A-Za-z].*/g, 'Debe comenzar con una letra')
    .matches(/.*?[A-Za-z]$/g, 'Debe terminar con una letra'),
  kind: yup.mixed().oneOf(Object.values(PetKind)).required('Seleccione la especie'),
  gender: yup.mixed().oneOf(Object.values(PetGender)).required('Seleccione género'),
  size: yup.mixed().oneOf(Object.values(PetSize)).required('Seleccione el tamaño'),
  birthdate: yup.string().required('Fecha de nacimiento es requerida'),
  description: yup
    .string()
    .required('Nombre es requerido')
    .min(2, 'Debe contener al menos dos letras')
    .matches(/[a-zA-Z ]+/g, 'Solo puede contener letras y espacios')
    .matches(/^[A-Za-z].*/g, 'Debe comenzar con una letra')
    .matches(/.*?[A-Za-z.]$/g, 'Debe terminar con una letra o punto')
});
