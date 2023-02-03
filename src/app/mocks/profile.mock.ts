import { Profile } from '../interfaces';

export const PROFILES: Profile[] = [
  {
    id: 1,
    name: 'Luciano Javier',
    lastname: 'Spalla',
    birthdate: new Date('1998-03-12T00:00:00.000-03:00').toISOString(),
    favs: [4],
    rating: 3.8,
    image: {
      id: 1,
      description: 'Profile pic',
      createdAt: new Date('2022-03-12T00:00:00.000-03:00').toISOString(),
      updatedAt: new Date('2022-03-12T00:00:00.000-03:00').toISOString(),
      url: 'https://drive.google.com/uc?export=view&id=1URGPkeJPxpay6Nv8LlIKaAy3u2bakPud'
    }
  },
  {
    id: 2,
    name: 'Milena Isabel',
    lastname: 'Oliveros',
    birthdate: new Date('2000-07-30T00:00:00.000-03:00').toISOString(),
    favs: [4],
    rating: 4.5,
    image: {
      id: 2,
      description: 'Profile pic',
      createdAt: new Date('2022-03-12T00:00:00.000-03:00').toISOString(),
      updatedAt: new Date('2022-03-12T00:00:00.000-03:00').toISOString(),
      url: 'https://drive.google.com/uc?export=view&id=1mgKTg9vCQVRWrlAmo9UGoQHYMt4p9Gbs'
    }
  },
  {
    id: 3,
    name: 'Claudina Elizabeth',
    lastname: 'Solis',
    rating: 3.2,
    birthdate: new Date('1965-09-08T00:00:00.000-03:00').toISOString(),
    favs: [4],
    image: null
  }
];
