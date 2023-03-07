export interface Message {
  user: number;
  content: string;
  date: Date;
  chat: number;
}

export interface Chat {
  id: number;
  messages: Message[];
  users: [number, number];
}
