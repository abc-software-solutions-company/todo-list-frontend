import {useRouter} from 'next/router';
import React, {ChangeEvent, useEffect, useState} from 'react';

import API, {ITask} from '@/api/network/task';
import TodoAPI, {ITodo} from '@/api/network/todo';
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
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [todo, setTodo] = useState<ITodo>();
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [actionTodo, setActionTodo] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);

  const {id} = router.query;
  const page = 'detail';

  const getTasks = () => API.getTasks(Number(id)).then(res => setTasks(res.data));
  const getTodo = () => TodoAPI.getTodo(id ? id.toString() : '').then(res => setTodo(res.data));

  const handleShare = () => {
    setShareOpen(true);
  };

  const handleCheck = (taskid: string, e: ChangeEvent<HTMLInputElement>) => {
    API.updateStatusTask(taskid).then(res => {
      getTasks();
    });
  };

  const resetAction = () => setAction({type: '', payload: null});
  const resetActionTodo = () => setActionTodo({type: '', payload: null});

  const reset = () => {
    getTasks();
    resetAction();
    resetActionTodo();
  };

  useEffect(() => {
    getTasks();
    getTodo();
  }, [id]);

  if (!tasks) return null;
  if (!id) return null;

  return (
    <div className={styles['page-detail']}>
      <div className="container">
        <div className="section-username ">
          <Icon name="ico-user" />
          <h4 className="username">Thien</h4>
        </div>
        <div className="section-nav">
          <div className="icon-arrow-left" onClick={() => router.push(ROUTES.ACTION)}>
            <Icon name="ico-arrow-left-circle" />
          </div>
          <h3 className="text">{todo?.name}</h3>
          <div className="action">
            <Button
              className="action-item"
              startIcon={<Icon name="ico-trash" />}
              onClick={() => setAction({type: 'delete', payload: null})}
            >
              <h3 className="text">Delete list</h3>
            </Button>
            <Button
              className="action-item"
              startIcon={<Icon name="ico-share" />}
              onClick={() => setAction({type: 'delete', payload: null})}
            >
              <h3 className="text">Share</h3>
            </Button>
            <Button
              className="action-item"
              startIcon={<Icon name="ico-plus-circle" size={28} />}
              onClick={() => setAction({type: 'add', payload: null})}
            >
              <h3 className="text">Add To-Do</h3>
            </Button>
          </div>
        </div>
        <div className="section-task-group">
          {!tasks.length && <p className="mt-2">Empty task</p>}
          {tasks.map(task => (
            <div className="task-list" key={task.id}>
              <div className="task-group">
                <Checkbox className="task-checkbox" checked={task.isDone} onChange={e => handleCheck(task.id, e)} />
                <p className={`task-name ${task.isDone ? 'checked' : ''}`}>{task.name}</p>
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
