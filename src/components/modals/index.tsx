import {useEffect} from 'react';

import socket, {socketUpdateList} from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import {useStateAuth} from '@/states/auth';
import useLists from '@/states/lists/use-lists';
import useModals from '@/states/modals/use-modals';

import ModalCreateList from './list/modal-create';
import ModalDeleteList from './list/modal-delete';
import ModalShareList from './list/modal-share';
import ModalUpdateList from './list/modal-update';
import ModalTaskDetail from './modal-task-detail';
import ModalCreateTask from './task/modal-create';
import ModalDeleteTask from './task/modal-delete';
import ModalShareTask from './task/modal-share';
import ModalUpdateTask from './task/modal-update';
import ModalUpdateUser from './user/modal-update';
import ModalCreateTest from './test/modal-create';

const Modals = () => {
  const auth = useStateAuth();
  const {get} = useLists();

  const {isOpenModal, setIsOpenModal} = useModals();
  const {selectedTask, selectedTodolist, selectedStatusId} = useModals();

  const onClose = () => {
    setIsOpenModal(null);
  };

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: selectedTodolist?.id};
      socket.connect();
    }

    socket.on(SOCKET_EVENTS.reconnect, attempt => {
      console.log('SocketIO', SOCKET_EVENTS.reconnect, attempt);
    });

    socket.on(SOCKET_EVENTS.updateList, () => {
      console.log('SocketIO', SOCKET_EVENTS.updateList);
    });

    return () => {
      socket.off(SOCKET_EVENTS.reconnect);
      socket.off(SOCKET_EVENTS.updateList);
    };
  }, [auth]);

  return (
    <>
      {/* Modal test */}
      <ModalCreateTest open={isOpenModal.testModal} onClose={onClose} />

      {/* Modal user */}
      {auth && <ModalUpdateUser open={isOpenModal.updateUser} onClose={onClose} data={auth} />}

      {/* Modal list */}
      <ModalCreateList open={isOpenModal.createList} onClose={onClose} />
      {selectedTodolist && (
        <ModalDeleteList open={isOpenModal.deleteList} onClose={onClose} data={selectedTodolist} onSuccess={get} />
      )}
      {selectedTodolist && (
        <ModalUpdateList
          open={isOpenModal.settings}
          onClose={onClose}
          data={selectedTodolist}
          onSuccess={() => {
            socketUpdateList();
            get();
          }}
        />
      )}
      {selectedTodolist && <ModalShareList open={isOpenModal.shareList} onClose={onClose} data={selectedTodolist} />}

      {/* Modal task */}
      <ModalCreateTask
        open={isOpenModal.createTask}
        onClose={onClose}
        onSuccess={socketUpdateList}
        todolistData={selectedTodolist}
        statusId={selectedStatusId}
      />
      {selectedTask && (
        <ModalUpdateTask
          open={isOpenModal.updateTask}
          onClose={onClose}
          taskData={selectedTask}
          onSuccess={socketUpdateList}
        />
      )}
      {selectedTask && (
        <ModalDeleteTask
          open={isOpenModal.deleteTask}
          onClose={onClose}
          data={selectedTask}
          onSuccess={socketUpdateList}
        />
      )}
      {selectedTask && <ModalShareTask open={isOpenModal.shareTask} onClose={onClose} data={selectedTask} />}
      <ModalTaskDetail />
    </>
  );
};

export default Modals;
