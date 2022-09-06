import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

import API, {ITask} from '@/api/network/task';
// import TodoAPI, {ITodo} from '@/api/network/todo';
import {ITodo} from '@/api/network/todo';
import ModalShare from '@/components/modal-share';
import ModalTaskAddEdit from '@/components/modal-task-add-edit';
import ModalTaskConfirmDelete from '@/components/modal-task-confirm-delete';
import ModalTodoConfirmDelete from '@/components/modal-todo-confirm-delete';
import Topbar from '@/components/topbar';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Checkbox from '@/core-ui/checkbox';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import LayoutDefault from '@/layouts/default';
import {IAction} from '@/types';

import styles from './style.module.scss';

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

export default function Detail() {
  const router = useRouter();
  const [todoList, setTodoList] = useState<ITodo>();
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [actionTodo, setActionTodo] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);

  const {id} = router.query;
  const page = 'detail';

  const socketMsgToServer = () => socket.emit('msgToServer');
  const getListTasks = (todoListId: string) => API.getListTasks(todoListId).then(res => setTodoList(res.data));
  // const getTodo = () => TodoAPI.getTodo(id ? id.toString() : '').then(res => setTodo(res.data));

  const handleShare = () => {
    setShareOpen(true);
  };

  const setDone = (taskId: string) => {
    if (!taskId) return;
    API.updateStatusTask(taskId).then(() => {
      getListTasks(id);
      socketMsgToServer();
    });
  };

  const resetAction = () => setAction({type: '', payload: null});
  const resetActionTodo = () => setActionTodo({type: '', payload: null});
  const socketMsgToClient = () => {
    socket.on('msgToClient', () => {
      getListTasks(id);
    });
  };

  const reset = () => {
    getListTasks(id);
    resetAction();
    resetActionTodo();
    socketMsgToServer();
  };

  useEffect(() => {
    if (id) {
      getListTasks(id);
      socketMsgToClient();
    }
  }, [id]);

  if (!todoList || !id) return null;

  return (
    <div className={styles['page-detail']}>
      <div className="container">
        <Topbar />
        <div className="toolbar">
          <div className="left">
            <IconButton name="ico-arrow-left-circle" size={32} onClick={() => router.push(ROUTES.TODO_LIST)} />
            <h3 className="title">{todoList.name}</h3>
          </div>
          <div className="right">
            <Button
              className="btn-delete"
              startIcon={<Icon name="ico-trash-2" />}
              onClick={() => setAction({type: 'delete', payload: todoList})}
            >
              <span className="text-h5 font-medium">Delete List</span>
            </Button>

            <Button className="btn-share" startIcon={<Icon name="ico-share-2" />} onClick={handleShare}>
              <span className="text-h5 font-medium">Share</span>
            </Button>
            <Button
              className="btn-create-new"
              startIcon={<Icon name="ico-plus-circle" />}
              onClick={() => setAction({type: 'add', payload: null})}
            >
              <span className="text-h5 font-medium">Add To-Do</span>
            </Button>
          </div>
        </div>

        <div className="tasks">
          {!todoList?.tasks.length && <span>Empty list</span>}
          {todoList.tasks &&
            todoList.tasks.map(task => (
              <div className="item" key={task.id}>
                <div className="checkbox-task">
                  <Checkbox className="mr-3" checked={task.isDone} onChange={() => setDone(task.id, !task.isDone)} />
                  <p className={`title ${task.isDone ? 'checked' : ''}`}>{task.name}</p>
                </div>
                <div className="actions">
                  <IconButton name="ico-trash-2" onClick={() => setAction({type: 'delete', payload: task})} />
                  <IconButton name="ico-edit" onClick={() => setAction({type: 'edit', payload: task})} />
                </div>
              </div>
            ))}
        </div>
      </div>
      {['add', 'edit'].includes(action.type) && (
        <ModalTaskAddEdit
          data={action.payload}
          todoListId={id.toString()}
          open={true}
          onSave={() => reset()}
          onCancel={() => resetAction()}
        />
      )}
      {['delete'].includes(action.type) && (
        <ModalTaskConfirmDelete
          data={action.payload}
          open={true}
          onConfirm={() => reset()}
          onCancel={() => resetAction()}
        />
      )}
      <ModalTodoConfirmDelete
        open={['delete'].includes(actionTodo.type)}
        data={actionTodo.payload}
        page={page}
        onConfirm={reset}
        onCancel={resetActionTodo}
      />
      <ModalShare open={shareOpen} onClose={() => setShareOpen(false)} id={id} />
    </div>
  );
}

Detail.Layout = LayoutDefault;
