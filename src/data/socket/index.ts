import {io} from 'socket.io-client';

import {SOCKET_EVENTS} from './type';

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080', {
  autoConnect: false
});

export const socketUpdateList = () => {
  socket.emit(SOCKET_EVENTS.updateList);
};

export const socketUpdateListExceptMe = () => {
  socket.emit(SOCKET_EVENTS.updateListExceptMe);
};

export default socket;
