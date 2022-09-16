import {useRouter} from 'next/router';
import React, {useContext, useEffect, useState} from 'react';
import io from 'socket.io-client';

import API from '@/api/network/task';
import {ITodo} from '@/api/network/todo';
import ModalShare from '@/components/modal-share';
import ModalTaskAddEdit from '@/components/modal-task-add-edit';
import ModalTaskConfirmDelete from '@/components/modal-task-confirm-delete';
import ModalTodoConfirmDelete from '@/components/modal-todo-confirm-delete';
import Seo from '@/components/seo/seo';
import {ROUTES} from '@/configs/routes.config';
import {siteSettings} from '@/configs/site.config';
import Button from '@/core-ui/button';
import Checkbox from '@/core-ui/checkbox';
import FloatIcon from '@/core-ui/float-icon';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import {ThemeContext} from '@/hooks/useAuthContext';
import LayoutDefault from '@/layouts/default';
import {IAction} from '@/types';

import styles from './style.module.scss';

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

export default function Detail() {
  const router = useRouter();
  const userObject = useContext(ThemeContext);
  const [todoList, setTodoList] = useState<ITodo>();
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [actionTodo, setActionTodo] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);

  const {id} = router.query;
  const page = 'detail';

  const socketMsgToServer = () => socket.emit('msgToServer', {roomId: id});

  const getListTasks = (todoListId: string) => API.getListTasks(todoListId).then(res => setTodoList(res.data));

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
    socket.on(`msgToClient_${id}`, () => {
      getListTasks(id).catch(() => router.push(ROUTES.TODO_LIST));
    });
  };

  const reset = () => {
    getListTasks(id);
    resetAction();
    resetActionTodo();
    socketMsgToServer();
  };

  useEffect(() => {
    if (userObject.id === '') {
      router.push(ROUTES.QUICKPLAY);
    }
    if (id) {
      getListTasks(id).catch(() => router.push(ROUTES.TODO_LIST));
      socketMsgToClient();
    }
  }, [id]);

  if (!todoList || !id) return null;

  if (userObject.id !== '')
    return (
      <>
        <Seo title={`${siteSettings.name} | ${todoList.name}`} description={siteSettings.description} />

        <div className={styles['page-detail']}>
          <div className="container">
            <div className="toolbar">
              <div className="left">
                <div className="title">
                  <h3>
                    {todoList.name} Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit doloribus
                    necessitatibus error repellat cumque nesciunt dolorum expedita sequi aut, sed vero voluptate
                    aspernatur labore quo animi pariatur cum assumenda exercitationem.
                  </h3>
                </div>
              </div>
              <div className="right">
                <Button
                  startIcon={<Icon name="ico-trash-2" />}
                  onClick={() => setActionTodo({type: 'delete', payload: todoList})}
                >
                  <span className="h5 font-medium">Delete List</span>
                </Button>
                <Button startIcon={<Icon name="ico-share-2" />} onClick={handleShare}>
                  <span className="h5 font-medium">Share</span>
                </Button>
                <Button
                  className="btn-add-todo"
                  startIcon={<Icon name="ico-plus-circle" />}
                  onClick={() => setAction({type: 'add', payload: null})}
                >
                  <span className="h5 font-medium">Add To-Do</span>
                </Button>
              </div>
            </div>
            <div className="tasks">
              {!todoList?.tasks.length && <span className="empty">Empty list</span>}
              {todoList.tasks &&
                todoList.tasks.map(task => (
                  <div className="item" key={task.id}>
                    <Checkbox checked={task.isDone} onChange={() => setDone(task.id, !task.isDone)} />
                    <p onClick={() => setDone(task.id, !task.isDone)} className={`h6 ${task.isDone ? 'checked' : ''}`}>
                      {task.name}
                    </p>
                    <div className="actions">
                      <IconButton name="ico-trash-2" onClick={() => setAction({type: 'delete', payload: task})} />
                      <IconButton name="ico-edit" onClick={() => setAction({type: 'edit', payload: task})} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <FloatIcon className="float-icon" onClick={() => setAction({type: 'add', payload: null})} />
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
      </>
    );
}

Detail.Layout = LayoutDefault;
