import { Profile } from '../interfaces';

export class Message {
  constructor(private user: Profile, private content: string, private date: Date) {}

  getUser() {
    return this.user;
  }

  getContent() {
    return this.content;
  }

  getDate() {
    return this.date;
  }
}

export class Chat {
  private messages: Message[] = [];

  constructor(private users: Profile[]) {}

  addMessage(message: Message) {
    this.messages.push(message);
  }

  addUser(user: Profile) {
    this.users.push(user);
  }

  removeUser(removeUser: Profile) {
    this.users = this.users.filter((user) => user.id === removeUser.id);
  }

  getMessages() {
    return this.messages;
  }
}
