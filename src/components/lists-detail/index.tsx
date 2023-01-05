import {useRouter} from 'next/router';
import {FC, useEffect} from 'react';

import FloatIcon from '@/core-ui/float-icon';
import socket from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import {useStateAuth} from '@/states/auth';
import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';

import ErrorInformation from '../common/404';
import Seo from '../common/seo/seo';
import ListTask from './list-task';
import styles from './style.module.scss';

export interface Iprops {
  id: string;
}

const ListDetail: FC<Iprops> = ({id}) => {
  const auth = useStateAuth();
  const router = useRouter();

  const {todolist, write, assest, error, getTodolist, statusList} = useTodolist();
  const {setIsOpenModal, setSelectedTodolist, setSelectedColumnId} = useModals();

  const statusIdList = statusList.map(e => e.id);
  const backlogId = Math.min(...statusIdList);

  const onClickFloatIcon = () => {
    setSelectedColumnId(backlogId);
    setSelectedTodolist(todolist);
    setIsOpenModal('createTask');
  };

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: id};
      socket.connect();
      getTodolist(id);
    }

    socket.on(SOCKET_EVENTS.reconnect, attempt => {
      console.log('SocketIO', SOCKET_EVENTS.reconnect, attempt);
      getTodolist(id);
    });

    socket.on(SOCKET_EVENTS.updateList, () => {
      console.log('SocketIO', SOCKET_EVENTS.updateList);
      getTodolist(id);
    });

    return () => {
      socket.off(SOCKET_EVENTS.reconnect);
      socket.off(SOCKET_EVENTS.updateList);
    };
  }, [auth]);

  if (todolist)
    if (router.asPath.includes(todolist.id))
      return (
        <>
          {assest && <Seo title={todolist.name} />}
          <div className={styles['list-detail']}>
            <ListTask />
            <FloatIcon className="float-icon" onClick={onClickFloatIcon} hidden={!write} />
          </div>
        </>
      );
  if (error) return <ErrorInformation />;

  return null;
};

export default ListDetail;
