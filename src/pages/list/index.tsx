import {useRouter} from 'next/router';
import React, {FC, useEffect, useState} from 'react';

import API, {ITodo} from '@/api/network/todo-list';
import ModalTodoAddEdit from '@/components/modal-todo-add-edit';
import ModalTodoConfirmDelete from '@/components/modal-todo-confirm-delete';
import Button from '@/core-ui/button';
import IconButton from '@/core-ui/ico-button';
import Icon from '@/core-ui/icon';
import Portal from '@/core-ui/portal';

import styles from './style.module.scss';

interface IAction {
  type: string;
  payload: any;
}

const List: FC = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [action, setAction] = useState<IAction>({type: '', payload: null});

  const getTodoLists = () => API.getTodoLists().then(res => setTodos(res.data));

  const resetAction = () => {
    setAction({type: '', payload: null});
  };

  const reset = () => {
    getTodoLists();
    resetAction();
  };

  useEffect(() => {
    getTodoLists();
  }, []);

  if (!todos) return null;

  return (
    <div className={styles['create-list-section']}>
      <div className="container">
        <div className="banner-list">
          <div className="list-user">
            <Icon name="ico-user" />
            <h4 className="title-user">{'Tin Tran'}</h4>
          </div>
          <div className="list-content">
            <div className="list-left">
              <div
                className="icon-arrow-left"
                onClick={() => {
                  router.push('/action');
                }}
              >
                <Icon size={28} name="ico-arrow-left-circle" />
              </div>
              <div className="title-left">
                <h3 className="title-todo">TO DO</h3>
                <h3 className="title-todo">YOUR LIST</h3>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="list-right"
              startIcon={<Icon name="ico-plus-circle" />}
              onClick={() => setAction({type: 'add', payload: null})}
            >
              <h3 className="title-right">New List</h3>
            </Button>
          </div>
        </div>
        <div className="list-group">
          {todos.map(item => (
            <div className="text-group" key={item.id}>
              <p className="title-group">{item.listName}</p>
              <div className="actions">
                <IconButton icon="ico-edit" onClick={() => setAction({type: 'edit', payload: item})} />
                <IconButton icon="ico-trash" onClick={() => setAction({type: 'delete', payload: item})} />
                <IconButton icon="ico-share" onClick={() => {}} />
                <IconButton icon="ico-arrow-right" onClick={() => router.push(`/list/${item.id}`)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Portal>
        {['add', 'edit'].includes(action.type) && <ModalTodoAddEdit data={action.payload} open={true} onSave={reset} />}
        {['delete'].includes(action.type) && (
          <ModalTodoConfirmDelete open={true} data={action.payload} onCancel={resetAction} onConfirm={() => reset()} />
        )}
      </Portal>
    </div>
  );
};
export default List;
