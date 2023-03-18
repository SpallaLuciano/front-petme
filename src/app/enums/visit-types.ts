export enum VisitTypes {
  CONTROL = 'CONTROL',
  VACCINATION = 'VACCINATION',
  DEWORM = 'DEWORM',
  ILLNESS_INJURY = 'ILLNESS_INJURY',
  OTHER = 'OTHER'
}

export const visitProps: { [key: string]: { color: string; label: string } } = {
  CONTROL: {
    color: '#98FB98',
    label: 'Control'
  },
  VACCINATION: {
    color: '#F0E68C',
    label: 'Vacunación'
  },
  DEWORM: {
    color: '#C5A3FF',
    label: 'Desparasitación'
  },
  ILLNESS_INJURY: {
    color: '#F08080',
    label: 'Enfermedad o lesión'
  },
  OTHER: {
    color: '#DCDCDC',
    label: 'Otro'
  }
};
