import { isToday } from 'date-fns';
import { isBefore } from 'date-fns/esm';
import * as yup from 'yup';

const isTodayOrBefore = (stringDate: string | undefined | null) => {
  if (stringDate) {
    const today = new Date();
    const date = new Date(stringDate);

    return isBefore(date, today) || isToday(date);
  } else {
    return false;
  }
};

export const visitValidationSchema = yup.object({
  description: yup
    .string()
    .required('Descripción es requerida')
    .min(2, 'Debe contenter al menos dos letras'),
  datetime: yup
    .string()
    .nullable()
    .required('La fecha de visita es requerida')
    .test('is-today-or-before', 'Debe ser hoy o anterior', isTodayOrBefore),
  place: yup.string().required('Lugar es requerido').min(2, 'Debe contener al menos dos letras'),
  address: yup
    .string()
    .required('Dirección es requerida')
    .min(2, 'Debe contener al menos dos letras')
});

export interface VisitSchema {
  description: string;
  datetime: string | null;
  place: string;
  address: string;
}
