import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import API, {ITodo} from '@/api/network/todo';
import ModalShare from '@/components/modal-share';
import ModalTodoAddEdit from '@/components/modal-todo-add-edit';
import ModalTodoConfirmDelete from '@/components/modal-todo-confirm-delete';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import LayoutDefault from '@/layouts/default';
import {IAction} from '@/types';

import styles from './style.module.scss';

export default function List() {
  const router = useRouter();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);
  const [id, setId] = useState('0');
  const [userName, setUserName] = useState('');

  const getUserName = () => {
    const userObject = JSON.parse(localStorage.getItem('user'));
    const userName = userObject.userName;
    setUserName(userName);
  };

  const getTodos = () => API.getTodos().then(res => setTodos(res.data));

  const resetAction = () => setAction({type: '', payload: null});

  const handleShare = id => {
    setShareOpen(true);
    setId(id);
  };

  const reset = () => {
    getTodos();
    resetAction();
  };

  useEffect(() => {
    getTodos();
    getUserName();
    setAction({type: 'add', payload: null});
  }, []);

  if (!todos) return null;

  return (
    <div className={styles['page-list']}>
      <div className="container">
        <div className="section-username">
          <Icon name="ico-user" />
          <h4 className="username">{userName}</h4>
        </div>
        <div className="section-nav">
          <div className="icon-arrow-left" onClick={() => router.push(ROUTES.ACTION)}>
            <Icon size={28} name="ico-arrow-left-circle" />
          </div>
          <ul className="content">
            <li className="text">TO DO</li>
            <li className="text">YOUR LIST</li>
          </ul>
          <Button
            className="new-list"
            startIcon={<Icon name="ico-plus-circle" size={28} />}
            onClick={() => setAction({type: 'add', payload: null})}
          >
            <h3 className="text">New List</h3>
          </Button>
        </div>

        <div className="section-list-group">
          {!todos.length && <span>Empty list</span>}
          {todos.map(item => (
            <div className="list-item" key={item.id}>
              <Button className="btn" onClick={() => router.push(`list/${item.id}`)}>
                <p className="list-name">{item.name}</p>
              </Button>
              <div className="actions">
                <IconButton name="ico-trash" onClick={() => setAction({type: 'delete', payload: item})} />
                <IconButton name="ico-edit" onClick={() => setAction({type: 'edit', payload: item})} />
                <IconButton name="ico-share" onClick={() => handleShare(item.id)} />
                <IconButton name="ico-arrow-right" onClick={() => router.push(`${ROUTES.LIST}/${item.id}`)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <pre>{JSON.stringify(action)}</pre> */}
      {/* <pre>{['add', 'edit'].includes(action.type).toString()}</pre> */}
      <ModalTodoAddEdit
        data={action.payload}
        open={['add', 'edit'].includes(action.type)}
        onSave={reset}
        onCancel={resetAction}
      />
      <ModalTodoConfirmDelete
        open={['delete'].includes(action.type)}
        data={action.payload}
        onConfirm={reset}
        onCancel={resetAction}
      />
      <ModalShare open={shareOpen} onClose={() => setShareOpen(false)} id={id} />
    </div>
  );
}

List.Layout = LayoutDefault;

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const translate = await serverSideTranslations(locale!, ['common']);

  return {
    props: {
      ...translate
    }
  };
};
