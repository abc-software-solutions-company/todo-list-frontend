import {useRouter} from 'next/router';
import {FC, useEffect} from 'react';

import ToolbarDetail from '@/components/lists-detail/toolbar';
import {ROUTES} from '@/configs/routes.config';
import FloatIcon from '@/core-ui/float-icon';
import socket from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import {useStateAuth} from '@/states/auth';
import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import ErrorInformation from '../common/404';
import Seo from '../common/seo/seo';
import ListTask from './list-task';
import ListTaskKanban from './list-task-kanban';
import styles from './style.module.scss';

export interface Iprops {
  id: string;
}

const ListDetail: FC<Iprops> = ({id}) => {
  const auth = useStateAuth();
  const router = useRouter();

  const {todolist, write, assest, error, initial} = useTodolist();
  const {initial: initialKanban} = useTodolistKanban();
  const {setIsOpenModal, setSelectedTodolist} = useModals();

  const onClickFloatIcon = () => {
    setSelectedTodolist(todolist);
    setIsOpenModal('createTask');
  };

  const isKanban = router.asPath.includes(ROUTES.KANBAN);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: id};
      socket.connect();
      initial(id);
      initialKanban(id);
    }

    socket.on(SOCKET_EVENTS.reconnect, attempt => {
      console.log('SocketIO', SOCKET_EVENTS.reconnect, attempt);
      initial(id);
      initialKanban(id);
    });

    socket.on(SOCKET_EVENTS.updateList, () => {
      console.log('SocketIO', SOCKET_EVENTS.updateList);
      initial(id);
      initialKanban(id);
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
            <div className={`${isKanban ? 'container-kanban' : 'container'}`}>
              <ToolbarDetail />
              {isKanban ? <ListTaskKanban /> : <ListTask />}
              <FloatIcon className="float-icon" onClick={onClickFloatIcon} hidden={!write} />
            </div>
          </div>
        </>
      );
  if (error) return <ErrorInformation />;

  return null;
};

export default ListDetail;
