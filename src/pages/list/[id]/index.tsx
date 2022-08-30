import Auth from '@/pages/auth';
import Button from '@/core-ui/button';
import Checkbox from '@/core-ui/checkbox';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/ico-button';
import ModalCreateEditTask from '@/components/modal-task-add-edit';
import ModalShare from '@/components/modal-share';
import useCheckUserLocalStorage from '@/hooks/useCheckUserLocalStorage';
import {useRouter} from 'next/router';
import API, {ITodo} from '@/api/network/todo-list';
import TaskAPI, {ITask} from '@/api/network/task';
import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';

import styles from './style.module.scss';
import ModalTaskConfirmDelete from '@/components/modal-task-confirm-delete';
import ModalTodoConfirmDelete from '@/components/modal-todo-confirm-delete';

interface IAction {
  type: string;
  payload: any;
}

const Detail: React.FC = () => {
  const router = useRouter();
  const {id} = router.query;

  const {user} = useCheckUserLocalStorage();
  const [list, setList] = useState<ITodo | null>(null);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [actionList, setActionList] = useState<IAction>({type: '', payload: null});

  // Get tasks.
  const getTasks = () => TaskAPI.getTasks(id ? id.toString() : '').then(res => setTasks(res.data));

  // Reset action.
  const resetAction = () => {
    setAction({type: '', payload: null});
  };

  const resetActionList = () => {
    setActionList({type: '', payload: null});
  };

  const reset = () => {
    getTasks();
    resetAction();
  };

  useEffect(() => {
    getTasks();
  }, [id]);

  // Handle checkbox.
  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    TaskAPI.updateActive(id).then(() => {
      getTasks();
    });
  };

  const handleShare = () => {
    setShareOpen(false);
  };

  // Get list name.
  useEffect(() => {
    const fetch = async () => {
      await API.readTodoList(Number(id)).then(res => {
        setList(res.data);
      });
    };

    fetch();
  }, [id]);

  if (!id) return null;
  if (!user) return null;
  if (!tasks) return null;

  return (
    <Auth>
      <div className={styles['create-detail-section']}>
        <div className="container">
          <div className="banner-detail">
            <div className="detail-content">
              <div className="detail-left">
                <div
                  className="icon-arrow-left"
                  onClick={() => {
                    router.push('/list');
                  }}
                >
                  <Icon name="ico-arrow-left-circle" />
                </div>
                <div className="title-left">
                  <h3 className="title-todo">{list ? list.listName : ''}</h3>
                </div>
              </div>
              <div className="detail-right">
                <Button
                  variant="contained"
                  color="primary"
                  className="items"
                  onClick={() => setActionList({type: 'delete', payload: list})}
                >
                  <Icon name="ico-trash" />
                  <div className="title-right">Delete</div>
                </Button>
                <Button variant="contained" color="primary" className="items" onClick={() => setShareOpen(true)}>
                  <Icon name="ico-share" />
                  <div className="title-right">Share</div>
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="items"
                  onClick={() => setAction({type: 'add', payload: null})}
                >
                  <Icon name="ico-plus-circle" />
                  <div className="title-right">Add To-Do</div>
                </Button>
              </div>
            </div>
          </div>
          <div className="detail-group">
            {tasks.map(task => (
              <>
                <div className="detail-list">
                  <div className="list-group">
                    <Checkbox
                      className="list-box"
                      checked={task.isDone}
                      onChange={event => handleCheckBox(event, task.id ? task.id : '')}
                    />

                    <p className={`title-group ${task.isDone ? 'checked' : ''}`}>{task.taskName}</p>
                  </div>
                  <div className="actions">
                    <IconButton
                      className="btn-hover-hand"
                      icon="ico-edit"
                      onClick={() => setAction({type: 'edit', payload: task})}
                    />

                    <IconButton
                      className="btn-hover-hand"
                      icon="ico-trash"
                      onClick={() => setAction({type: 'delete', payload: task})}
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
          {['add', 'edit'].includes(action.type) && (
            <ModalCreateEditTask
              open={true}
              data={action.payload}
              onSave={reset}
              todolistId={Number(id)}
              userId={user.id}
            />
          )}
          {['delete'].includes(action.type) && (
            <ModalTaskConfirmDelete data={action.payload} open={true} onCancel={resetAction} onConfirm={reset} />
          )}
          {['delete'].includes(actionList.type) && (
            <ModalTodoConfirmDelete
              open={true}
              data={actionList.payload}
              page={'detail'}
              onCancel={resetActionList}
              onConfirm={() => reset()}
            />
          )}
          <ModalShare open={shareOpen} onClose={handleShare} id={id} />
        </div>
      </div>
    </Auth>
  );
};

export default Detail;
