import * as yup from 'yup';

export const profileUpdateSchema = yup.object({
  name: yup
    .string()
    .required('Nombre es requerido')
    .min(2, 'Debe contener al menos dos letras')
    .matches(/[a-zA-Z ]+/g, 'Solo puede contener letras y espacios')
    .matches(/^[A-Za-z].*/g, 'Debe comenzar con una letra')
    .matches(/.*?[A-Za-z]$/g, 'Debe terminar con una letra'),
  lastname: yup
    .string()
    .required('Nombre es requerido')
    .min(2, 'Debe contener al menos dos letras')
    .matches(/[a-zA-Z ]+/g, 'Solo puede contener letras y espacios')
    .matches(/^[A-Za-z].*/g, 'Debe comenzar con una letra')
    .matches(/.*?[A-Za-z]$/g, 'Debe terminar con una letra'),
  birthdate: yup.string().required('Fecha de nacimiento es requerida')
});
