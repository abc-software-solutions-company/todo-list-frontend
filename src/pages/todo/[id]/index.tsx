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
    <div className={styles['create-detail-section']}>
      <div className="container">
        <div className="banner-detail">
          <div className="detail-content">
            <div className="detail-left">
              <div
                className="icon-arrow-left"
                onClick={() => {
                  router.push(ROUTES.TODO);
                }}
              >
                <Icon name="ico-arrow-left-circle" />
              </div>
              <div className="title-left">
                <h3 className="title-todo">{todo?.name}</h3>
              </div>
            </div>
            <div className="detail-right">
              <Button className="items" onClick={() => setActionTodo({type: 'delete', payload: todo})}>
                <Icon name="ico-trash" />
                <div className="title-right">Delete list</div>
              </Button>
              <Button className="items" onClick={handleShare}>
                <Icon name="ico-share" />
                <div className="title-right">Share</div>
              </Button>
              <Button onClick={() => setAction({type: 'add', payload: null})}>
                <Icon name="ico-plus-circle" />
                <div className="title-right">Add To-Do</div>
              </Button>
            </div>
          </div>
        </div>
        <div className="detail-group">
          {!tasks.length && <span>Empty list</span>}
          {tasks.map(task => (
            <div className="detail-list" key={task.id}>
              <div className="list-group">
                <Checkbox className="list-box" checked={task.isDone} onChange={e => handleCheck(task.id, e)} />
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
        onCancel={resetAction}
      />
      <ModalShare open={shareOpen} onClose={() => setShareOpen(false)} id={id[0]} />
    </div>
  );
}

Detail.Layout = LayoutDefault;
