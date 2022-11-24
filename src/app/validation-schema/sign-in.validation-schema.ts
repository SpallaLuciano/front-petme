import * as yup from 'yup';

export const signInValidationSchema = yup.object({
  email: yup
    .string()
    .email('Ingresa un email válido')
    .required('Email es requerido'),
  password: yup
    .string()
    .required('Contraseña es requerida'),
});