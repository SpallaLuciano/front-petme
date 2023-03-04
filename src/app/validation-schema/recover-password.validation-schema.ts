import * as yup from 'yup';

export const recoverPasswordValidationSchema = yup.object({
  email: yup.string().email('Ingresa un email válido').required('Email es requerido')
});

export const resetPasswordValidationSchema = yup.object({
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
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
});
