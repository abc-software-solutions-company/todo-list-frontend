import {useRouter} from 'next/router';
import {FC, useEffect} from 'react';

import ToolbarDetail from '@/components/list-detail/toolbar';
import ModalCreateUpdateList from '@/components/modal/modal-create-update-list';
import ModalCreateUpdateTask from '@/components/modal/modal-create-update-task';
import ModalDelete from '@/components/modal/modal-delete';
import ModalShare from '@/components/modal/modal-share';
import FloatIcon from '@/core-ui/float-icon';
import socket, {socketUpdateList} from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import {useStateAuth} from '@/states/auth';
import useTodolist from '@/states/todolist/use-todolist';

import ErrorInformation from '../common/404';
import Seo from '../common/seo/seo';
import ListTask from './list-task';
import styles from './style.module.scss';

export interface Iprops {
  id: string;
}

const ListDetail: FC<Iprops> = ({id}) => {
  const {todolist, error, selectedTask, isOpenModal, write, assest, owner, initial, setIsOpenModal} = useTodolist();
  const auth = useStateAuth();
  const router = useRouter();

  const onClickFloatIcon = () => {
    setIsOpenModal('task');
  };

  const onClose = () => {
    setIsOpenModal(null);
  };

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: id};
      socket.connect();
      initial(id);
    }

    socket.on(SOCKET_EVENTS.reconnect, attempt => {
      console.log('SocketIO', SOCKET_EVENTS.reconnect, attempt);
      initial(id);
    });

    socket.on(SOCKET_EVENTS.updateList, () => {
      console.log('SocketIO', SOCKET_EVENTS.updateList);
      initial(id);
    });

    return () => {
      socket.off(SOCKET_EVENTS.reconnect);
      socket.off(SOCKET_EVENTS.updateList);
    };
  }, [auth]);

  if (todolist) {
    if (error || !assest) return <ErrorInformation />;
    if (!router.asPath.includes(id)) return null;
  } else return null;

  return (
    <>
      {assest && <Seo title={todolist.name} />}
      <div className={styles['list-detail']}>
        <div className="container">
          <ToolbarDetail />
          <ListTask />
          <FloatIcon className="float-icon" onClick={onClickFloatIcon} hidden={!write} />
          <ModalCreateUpdateList open={isOpenModal.settings} onClose={onClose} data={todolist} onSuccess={socketUpdateList} hiddenVisibility={!owner} />
          <ModalDelete open={isOpenModal.delete} onClose={onClose} data={selectedTask || todolist} onSuccess={socketUpdateList} />
          <ModalShare open={isOpenModal.share} onClose={onClose} data={todolist} />
          <ModalCreateUpdateTask open={isOpenModal.task} onClose={onClose} listData={todolist} taskData={selectedTask} onSuccess={socketUpdateList} />
        </div>
      </div>
    </>
  );
};

export default ListDetail;
