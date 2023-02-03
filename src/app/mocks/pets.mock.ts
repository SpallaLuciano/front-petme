/* eslint-disable max-len */
import { PetGender, PetKind, PetSize } from '../enums';
import { Pet } from '../interfaces';

const PETS: Pet[] = [
  {
    id: 1,
    name: 'Milo',
    owner: 1,
    kind: PetKind.DOG,
    gender: PetGender.MALE,
    size: PetSize.LARGE,
    description:
      'Soy un machito de 6 meses y ya tengo mi primera vacuna. Soy muy compañero, me encanta dar besitos, jugar con mi pelotita y después dormir una buena siesta 😴 me llevo bien con otros perritos, estoy aprendiendo a quedarme solito y siempre te voy a recibir con mucho amor ❤‍🩹 Me adoptas?',
    birthdate: new Date('2022-02-08T00:00:00.000-03:00').toISOString(),
    coordinates: {
      latitude: -31.368929552484754,
      longitude: -64.24609940279937
    },
    images: [
      {
        id: 3,
        description: 'Milo sentado',
        url: 'https://drive.google.com/uc?id=1yfrtY_KePchDkXw6-LFa_dWwr3vCfZ67',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      },
      {
        id: 4,
        description: 'Milo durmiendo',
        url: 'https://drive.google.com/uc?id=1yvH2BqvlURJyEL0J2-SNGxU70N88ZYzo',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      },
      {
        id: 5,
        description: 'Milo durmiendo 2',
        url: 'https://drive.google.com/uc?id=1ysqYDRvSWMq2D6NWAaDOfj-mgxcHeX5-',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      }
    ],
    createdAt: new Date('2022-04-16').toISOString(),
    updatedAt: new Date('2022-04-20').toISOString()
  },
  {
    id: 2,
    name: 'Luna',
    owner: 1,
    kind: PetKind.DOG,
    gender: PetGender.FEMALE,
    size: PetSize.MEDIUM,
    description:
      'Soy un machito de 6 meses y ya tengo mi primera vacuna. Soy muy compañero, me encanta dar besitos, jugar con mi pelotita y después dormir una buena siesta 😴 me llevo bien con otros perritos, estoy aprendiendo a quedarme solito y siempre te voy a recibir con mucho amor ❤‍🩹 Me adoptas?',
    birthdate: new Date('2022-04-16T00:00:00.000-03:00').toISOString(),
    coordinates: {
      latitude: -31.357882131428852,
      longitude: -64.23642179611878
    },
    images: [
      {
        id: 6,
        description: 'Milo durmiendo',
        url: 'https://drive.google.com/uc?id=1yvH2BqvlURJyEL0J2-SNGxU70N88ZYzo',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      },
      {
        id: 7,
        description: 'Milo sentado',
        url: 'https://om/uc?id=1yfrtY_KePchDkXw6-LFa_dWwr3vCfZ67',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      },
      {
        id: 8,
        description: 'Milo durmiendo 2',
        url: 'https://drive.google.com/uc?id=1ysqYDRvSWMq2D6NWAaDOfj-mgxcHeX5-',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      }
    ],
    createdAt: new Date('2022-04-16').toISOString(),
    updatedAt: new Date('2022-04-16').toISOString()
  },
  {
    id: 3,
    name: 'Kira',
    owner: 2,
    kind: PetKind.DOG,
    size: PetSize.SMALL,
    gender: PetGender.FEMALE,
    description:
      'Soy un machito de 6 meses y ya tengo mi primera vacuna. Soy muy compañero, me encanta dar besitos, jugar con mi pelotita y después dormir una buena siesta 😴 me llevo bien con otros perritos, estoy aprendiendo a quedarme solito y siempre te voy a recibir con mucho amor ❤‍🩹 Me adoptas?',
    birthdate: new Date('2022-01-08T00:00:00.000-03:00').toISOString(),
    coordinates: {
      latitude: -31.34085960909544,
      longitude: -64.27988882905628
    },
    images: [
      {
        id: 9,
        description: 'Milo durmiendo 2',
        url: 'https://drive.google.com/uc?id=1ysqYDRvSWMq2D6NWAaDOfj-mgxcHeX5-',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      },
      {
        id: 10,
        description: 'Milo sentado',
        url: 'https://drive.google.com/uc?id=1yfrtY_KePchDkXw6-LFa_dWwr3vCfZ67',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      },
      {
        id: 11,
        description: 'Milo durmiendo',
        url: 'https://drive.google.com/uc?id=1yvH2BqvlURJyEL0J2-SNGxU70N88ZYzo',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      }
    ],
    createdAt: new Date('2022-04-16').toISOString(),
    updatedAt: new Date('2022-04-16').toISOString()
  },
  {
    id: 4,
    name: 'Alex',
    owner: 2,
    kind: PetKind.CAT,
    size: PetSize.UNKNOWN,
    gender: PetGender.MALE,
    description:
      'Soy un machito de 6 meses y ya tengo mi primera vacuna. Soy muy compañero, me encanta dar besitos, jugar con mi pelotita y después dormir una buena siesta 😴 me llevo bien con otros perritos, estoy aprendiendo a quedarme solito y siempre te voy a recibir con mucho amor ❤‍🩹 Me adoptas?',
    birthdate: new Date('2017-06-13T00:00:00.000-03:00').toISOString(),
    coordinates: {
      latitude: -31.39249300241515,
      longitude: -64.26374776461657
    },
    images: [
      {
        id: 12,
        description: 'Milo sentado',
        url: 'https://drive.google.com/uc?id=1yfrtY_KePchDkXw6-LFa_dWwr3vCfZ67',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      },
      {
        id: 13,
        description: 'Milo durmiendo',
        url: 'https://drive.google.com/uc?id=1yvH2BqvlURJyEL0J2-SNGxU70N88ZYzo',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      },
      {
        id: 14,
        description: 'Milo durmiendo 2',
        url: 'https://drive.google.com/uc?id=1ysqYDRvSWMq2D6NWAaDOfj-mgxcHeX5-',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      }
    ],
    createdAt: new Date('2022-04-16').toISOString(),
    updatedAt: new Date('2022-04-16').toISOString()
  },
  {
    id: 5,
    name: 'Tom',
    owner: 3,
    kind: PetKind.CAT,
    size: PetSize.SMALL,
    gender: PetGender.MALE,
    description:
      'Soy un machito de 6 meses y ya tengo mi primera vacuna. Soy muy compañero, me encanta dar besitos, jugar con mi pelotita y después dormir una buena siesta 😴 me llevo bien con otros perritos, estoy aprendiendo a quedarme solito y siempre te voy a recibir con mucho amor ❤‍🩹 Me adoptas?',
    birthdate: new Date('2016-12-25T00:00:00.000-03:00').toISOString(),
    coordinates: {
      latitude: -31.3672425073277,
      longitude: -64.27726781385509
    },
    images: [
      {
        id: 15,
        description: 'Milo sentado',
        url: 'https://drive.google.com/uc?id=1yfrtY_KePchDkXw6-LFa_dWwr3vCfZ67',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      },
      {
        id: 16,
        description: 'Milo durmiendo',
        url: 'https://drive.google.com/uc?id=1yvH2BqvlURJyEL0J2-SNGxU70N88ZYzo',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      },
      {
        id: 17,
        description: 'Milo durmiendo 2',
        url: 'https://drive.google.com/uc?id=1ysqYDRvSWMq2D6NWAaDOfj-mgxcHeX5-',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      }
    ],
    createdAt: new Date('2022-04-16').toISOString(),
    updatedAt: new Date('2022-04-16').toISOString()
  },
  {
    id: 6,
    name: 'Rex',
    owner: 3,
    kind: PetKind.DOG,
    size: PetSize.MEDIUM,
    gender: PetGender.MALE,
    description:
      'Soy un machito de 6 meses y ya tengo mi primera vacuna. Soy muy compañero, me encanta dar besitos, jugar con mi pelotita y después dormir una buena siesta 😴 me llevo bien con otros perritos, estoy aprendiendo a quedarme solito y siempre te voy a recibir con mucho amor ❤‍🩹 Me adoptas?',
    birthdate: new Date('2010-03-12T00:00:00.000-03:00').toISOString(),
    coordinates: {
      latitude: -31.351503673448146,
      longitude: -64.23642173842458
    },
    images: [
      {
        id: 18,
        description: 'Milo sentado',
        url: 'https://drive.google.com/uc?id=1yfrtY_KePchDkXw6-LFa_dWwr3vCfZ67',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      },
      {
        id: 19,
        description: 'Milo durmiendo',
        url: 'https://drive.google.com/uc?id=1yvH2BqvlURJyEL0J2-SNGxU70N88ZYzo',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      },
      {
        id: 20,
        description: 'Milo durmiendo 2',
        url: 'https://drive.google.com/uc?id=1ysqYDRvSWMq2D6NWAaDOfj-mgxcHeX5-',
        createdAt: new Date('2022-04-16').toISOString(),
        updatedAt: new Date('2022-04-16').toISOString()
      }
    ],
    createdAt: new Date('2022-04-16').toISOString(),
    updatedAt: new Date('2022-04-16').toISOString()
  }
];

export default PETS;
