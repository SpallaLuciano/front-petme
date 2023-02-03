import { isBefore, sub } from 'date-fns';
import * as yup from 'yup';

const isOlder = (stringDate: string | null | undefined) => {
  if (typeof stringDate !== 'string') return false;
  const maxDate = sub(new Date(), { years: 18 });
  const date = new Date(stringDate);
  return isBefore(date, maxDate);
};

export const signUpValidationSchema = yup.object({
  name: yup
    .string()
    .required('Nombre es requerido')
    .min(2, 'Debe contener al menos dos letras')
    .matches(/[a-zA-Z ]+/g, 'Solo puede contener letras y espacios')
    .matches(/^[A-Za-z].*/g, 'Debe comenzar con una letra')
    .matches(/.*?[A-Za-z]$/g, 'Debe terminar con una letra'),
  lastname: yup
    .string()
    .required('Apellido es requerido')
    .min(2, 'Debe contener al menos dos letras')
    .matches(/[a-zA-Z ]+/g, 'Solo puede contener letras y espacios')
    .matches(/^[A-Za-z].*/g, 'Debe comenzar con una letra')
    .matches(/.*?[A-Za-z]$/g, 'Debe terminar con una letra'),
  email: yup.string().email('Ingresa un email válido').required('Email es requerido'),
  password: yup
    .string()
    .required('Contraseña es requerida')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
      'La contraseña debe tener al menos 8 caracteres, con al menos un número y una letra'
    ),
  rePassword: yup
    .string()
    .required('Es necesario repetir la contraseña')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
  birthdate: yup
    .string()
    .nullable()
    .required('Fecha de nacimiento es requerida')
    .test('is-older', 'Debe ser mayor de 18 años', isOlder)
});
