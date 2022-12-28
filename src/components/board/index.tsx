import {FC, useEffect} from 'react';

import socket from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import {useStateAuth} from '@/states/auth';
import useBoards from '@/states/board/use-boards';

import KanbanContainer from './container';

export interface Iprops {
  id: string;
}

const KanbanDetail: FC<Iprops> = ({id}) => {
  const auth = useStateAuth();

  const {getBoard} = useBoards();

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: id};
      socket.connect();
      getBoard(id);
    }

    socket.on(SOCKET_EVENTS.reconnect, attempt => {
      console.log('SocketIO', SOCKET_EVENTS.reconnect, attempt);
      getBoard(id);
    });

    socket.on(SOCKET_EVENTS.updateList, () => {
      console.log('SocketIO', SOCKET_EVENTS.updateList);
      getBoard(id);
    });

    return () => {
      socket.off(SOCKET_EVENTS.reconnect);
      socket.off(SOCKET_EVENTS.updateList);
    };
  }, [auth]);

  return <KanbanContainer />;
};

export default KanbanDetail;
