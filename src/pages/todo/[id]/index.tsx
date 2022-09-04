import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import API, {ITask} from '@/api/network/task';
import ModalTaskAddEdit from '@/components/modal-task-add-edit';
import ModalTaskConfirmDelete from '@/components/modal-task-confirm-delete';
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
  const [action, setAction] = useState<IAction>({type: '', payload: null});

  const {id} = router.query;

  const getTasks = () => API.getTasks().then(res => setTasks(res.data));

  const resetAction = () => setAction({type: '', payload: null});

  const reset = () => {
    getTasks();
    resetAction();
  };

  useEffect(() => {
    getTasks();
  }, [id]);

  if (!tasks) return null;

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
                <h3 className="title-todo">List</h3>
              </div>
            </div>
            <div className="detail-right">
              <Button className="items">
                <Icon name="ico-trash" />
                <div className="title-right">Delete list</div>
              </Button>
              <Button className="items">
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
                <Checkbox className="list-box" checked={task.isDone} />
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
        <ModalTaskAddEdit data={action.payload} open={true} onSave={() => reset()} onCancel={() => resetAction()} />
      )}
      {['delete'].includes(action.type) && (
        <ModalTaskConfirmDelete
          data={action.payload}
          open={true}
          onConfirm={() => reset()}
          onCancel={() => resetAction()}
        />
      )}
    </div>
  );
}

Detail.Layout = LayoutDefault;
