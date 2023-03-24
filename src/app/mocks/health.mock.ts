import { PetKind, VisitTypes } from '../enums';
import { Health, Vaccine } from '../interfaces';

export const HEALTH: Health[] = [
  {
    petId: 1,
    vaccines: [],
    visits: [
      {
        datetime: new Date('06-10-2022').toISOString(),
        description: 'Baño',
        id: 15,
        address: 'Sabra dio 1199',
        place: 'Veterinaria alem',
        type: VisitTypes.OTHER,
        petId: 1
      },
      {
        datetime: new Date('05-10-2022').toISOString(),
        description: 'Primera vacuna antirabica',
        id: 14,
        address: 'Sabra dio 1199',
        place: 'Veterinaria alem',
        type: VisitTypes.VACCINATION,
        petId: 1
      },
      {
        datetime: new Date('04-10-2022').toISOString(),
        description: 'Control por empacho',
        id: 13,
        address: 'Sabra dio 1199',
        place: 'Veterinaria alem',
        type: VisitTypes.ILLNESS_INJURY,
        petId: 1
      },
      {
        datetime: new Date('03-10-2022').toISOString(),
        description: 'Desparasitación normal',
        id: 12,
        address: 'Sabra dio 1199',
        place: 'Veterinaria alem',
        type: VisitTypes.DEWORM,
        petId: 1
      },
      {
        datetime: new Date('02-10-2022').toISOString(),
        description: 'Control por nacimiento, los resultados fueron ok',
        id: 11,
        address: 'Sabra dio 1199',
        place: 'Veterinaria alem',
        type: VisitTypes.CONTROL,
        petId: 1
      }
    ],
    weight: 25
  },
  {
    petId: 2,
    vaccines: [
      {
        id: 1,
        date: new Date('05-14-2022').toISOString()
      },
      {
        id: 2,
        date: new Date('05-14-2022').toISOString()
      },
      {
        id: 3,
        date: new Date('07-02-2022').toISOString()
      }
    ],
    visits: [],
    weight: 25
  },
  {
    petId: 3,
    vaccines: [
      {
        id: 1,
        date: new Date('05-14-2022').toISOString()
      },
      {
        id: 2,
        date: new Date('05-14-2022').toISOString()
      },
      {
        id: 3,
        date: new Date('07-02-2022').toISOString()
      }
    ],
    visits: [
      {
        datetime: new Date('06-10-2022').toISOString(),
        description: 'Baño',
        id: 35,
        address: 'Sabra dio 1199',
        place: 'Veterinaria alem',
        type: VisitTypes.OTHER,
        petId: 3
      },
      {
        datetime: new Date('05-10-2022').toISOString(),
        description: 'Primera vacuna antirabica',
        id: 34,
        address: 'Sabra dio 1199',
        place: 'Veterinaria alem',
        type: VisitTypes.VACCINATION,
        petId: 3
      },
      {
        datetime: new Date('04-10-2022').toISOString(),
        description: 'Control por empacho',
        id: 33,
        address: 'Sabra dio 1199',
        place: 'Veterinaria alem',
        type: VisitTypes.ILLNESS_INJURY,
        petId: 3
      },
      {
        datetime: new Date('03-10-2022').toISOString(),
        description: 'Desparasitación normal',
        id: 32,
        address: 'Sabra dio 1199',
        place: 'Veterinaria alem',
        type: VisitTypes.DEWORM,
        petId: 3
      },
      {
        datetime: new Date('02-10-2022').toISOString(),
        description: 'Control por nacimiento, los resultados fueron ok',
        id: 31,
        address: 'Sabra dio 1199',
        place: 'Veterinaria alem',
        type: VisitTypes.CONTROL,
        petId: 3
      }
    ],
    weight: 25
  },
  {
    petId: 4,
    vaccines: [
      {
        id: 5,
        date: new Date('05-14-2022').toISOString()
      },
      {
        id: 6,
        date: new Date('05-14-2022').toISOString()
      },
      {
        id: 7,
        date: new Date('07-02-2022').toISOString()
      }
    ],
    visits: [],
    weight: 25
  },
  {
    petId: 5,
    visits: [],
    vaccines: []
  },
  {
    petId: 6,
    visits: [],
    vaccines: []
  }
];

export const VACCINES: Vaccine[] = [
  {
    id: 1,
    name: 'Antirrabica',
    petKind: PetKind.DOG
  },
  {
    id: 2,
    name: 'Parvovirus Canino',
    petKind: PetKind.DOG
  },
  {
    id: 3,
    name: 'Moquillo',
    petKind: PetKind.DOG
  },
  {
    id: 4,
    name: 'Hepatitis Canina',
    petKind: PetKind.DOG
  },
  {
    id: 5,
    name: 'Trivalente',
    petKind: PetKind.CAT
  },
  {
    id: 6,
    name: 'Leucemia',
    petKind: PetKind.CAT
  },
  {
    id: 7,
    name: 'Antirrabia',
    petKind: PetKind.CAT
  }
];
