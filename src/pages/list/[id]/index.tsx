import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import API, {ITask} from '@/api/network/task';
// import TodoAPI, {ITodo} from '@/api/network/todo';
import {ITodo} from '@/api/network/todo';
import ModalShare from '@/components/modal-share';
import ModalTaskAddEdit from '@/components/modal-task-add-edit';
import ModalTaskConfirmDelete from '@/components/modal-task-confirm-delete';
import ModalTodoConfirmDelete from '@/components/modal-todo-confirm-delete';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Checkbox from '@/core-ui/checkbox';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import LayoutDefault from '@/layouts/default';
import {IAction} from '@/types';

import styles from './style.module.scss';

export default function Detail() {
  const router = useRouter();
  const [todoList, setTodoList] = useState<ITodo>();
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [actionTodo, setActionTodo] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);

  const {id} = router.query;
  const page = 'detail';

  const getListTasks = (listId: string) => API.getListTasks(listId).then(res => setTodoList(res.data));
  // const getTodo = () => TodoAPI.getTodo(id ? id.toString() : '').then(res => setTodo(res.data));

  const handleShare = () => {
    setShareOpen(true);
  };

  const setDone = (taskId: string, value: boolean) => {
    if (!taskId) return;
    API.updateTask(taskId, {isDone: value} as ITask).then(() => getListTasks(id));
  };

  const resetAction = () => setAction({type: '', payload: null});
  const resetActionTodo = () => setActionTodo({type: '', payload: null});

  const reset = () => {
    getListTasks(id);
    resetAction();
    resetActionTodo();
  };

  useEffect(() => {
    if (id) getListTasks(id);
  }, [id]);

  if (!todoList || !id) return null;

  return (
    <div className={styles['create-detail-section']}>
      <div className="container">
        <div className="banner-detail">
          <div className="detail-content">
            <div className="detail-left">
              <div
                className="icon-arrow-left"
                onClick={() => {
                  router.push(ROUTES.TODO_LIST);
                }}
              >
                <Icon name="ico-arrow-left-circle" />
              </div>
              <div className="title-left">
                <h3 className="title-todo">{todoList.name}</h3>
              </div>
            </div>
            <div className="detail-right">
              <Button className="items" onClick={() => setActionTodo({type: 'delete', payload: todoList})}>
                <Icon name="ico-trash" />
                <div className="title-right">Delete list</div>
              </Button>
              <Button className="items" onClick={handleShare}>
                <Icon name="ico-share" />
                <div className="title-right">Share</div>
              </Button>
              <Button className="items" onClick={() => setAction({type: 'add', payload: null})}>
                <Icon name="ico-plus-circle" />
                <div className="title-right">Add To-Do</div>
              </Button>
            </div>
          </div>
        </div>
        <div className="detail-group">
          {!todoList.tasks.length && <span>Empty list</span>}
          {todoList.tasks.map(task => (
            <div className="detail-list" key={task.id}>
              <div className="list-group">
                <Checkbox className="list-box" checked={task.isDone} onChange={() => setDone(task.id, !task.isDone)} />
                <p className={`title-group ${task.isDone ? 'checked' : ''}`}>{task.name}</p>
              </div>
              <div className="actions">
                <IconButton name="ico-edit" onClick={() => setAction({type: 'edit', payload: task})} />
                <IconButton name="ico-trash" onClick={() => setAction({type: 'delete', payload: task})} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {['add', 'edit'].includes(action.type) && (
        <ModalTaskAddEdit
          data={action.payload}
          listId={id.toString()}
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
