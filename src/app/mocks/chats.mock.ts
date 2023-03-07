import { Chat } from '../interfaces';

export const CHATS: Chat[] = [
  {
    id: 1,
    messages: [
      {
        content: 'Hola, como estas?',
        date: new Date(),
        user: 2,
        chat: 1
      },
      {
        content: 'Hola, todo bien por suerte, y vos?',
        date: new Date(),
        user: 1,
        chat: 1
      },
      {
        content: 'Muy bien también! c:',
        date: new Date(),
        user: 2,
        chat: 1
      }
    ],
    users: [1, 2]
  },
  {
    id: 2,
    messages: [
      {
        content: 'Hola, como estas?',
        date: new Date(),
        user: 1,
        chat: 2
      },
      {
        content: 'Hola, todo bien por suerte, y vos?',
        date: new Date(),
        user: 3,
        chat: 2
      },
      {
        content: 'Muy bien también! c:',
        date: new Date(),
        user: 1,
        chat: 2
      }
    ],
    users: [1, 3]
  }
];
