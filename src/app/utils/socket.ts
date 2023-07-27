import { Manager, Socket } from 'socket.io-client';
import { Message } from '../interfaces';
import { SendMessageInput } from '../inputs';

interface OnEvents {
  message: (message: Message) => void;
}
interface EmitEvents {
  'new-message': (message: SendMessageInput) => boolean;
}
type AppSocket = Socket<OnEvents, EmitEvents>;

// dispatch(receiveMessage(message));

function createSocket(token: string): AppSocket {
  const manager = new Manager<EmitEvents, OnEvents>(process.env.REACT_APP_SOCKET_ENDPOINT);

  const socket = manager.socket('/', {
    auth: {
      token
    }
  });

  return socket;
}

export class SocketClient {
  private socket: AppSocket | null = null;

  connect(token: string) {
    if (!this.socket) {
      this.socket = createSocket(token);
      return true;
    }
    return false;
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      return true;
    }
    return false;
  }

  sendMessage(message: SendMessageInput) {
    if (this.socket) {
      this.socket.emit('new-message', message);
      return true;
    }
    return false;
  }

  onMessage(callback: (message: Message) => void) {
    if (this.socket) {
      this.socket.on('message', callback);
      return true;
    }
    return false;
  }
}

export default new SocketClient();
