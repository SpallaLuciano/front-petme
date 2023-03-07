import io from 'socket.io-client';

export const socket = io(String(process.env.REACT_SOCKET_ENDPOINT));
