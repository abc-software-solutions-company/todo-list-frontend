import io from 'socket.io-client';

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);
export const msgToServer = (id: any) => socket.emit('msgToServer', {roomId: id});

export const msgToClient = (id: any) => {
  socket.on(`msgToClient_${id}`, () => {
    return true;
  });
  return false;
};
