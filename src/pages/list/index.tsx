import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import API, {ITodo} from '@/api/network/todo';
import ModalShare from '@/components/modal-share';
import ModalTodoAddEdit from '@/components/modal-todo-add-edit';
import ModalTodoConfirmDelete from '@/components/modal-todo-confirm-delete';
import Topbar from '@/components/topbar';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import LayoutDefault from '@/layouts/default';
import {IAction} from '@/types';

import styles from './style.module.scss';

export default function List() {
  const router = useRouter();
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);
  const [id, setId] = useState<string>('');
  const userObject = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = userObject.id;

  const getTodoList = () => API.getTodos(userId).then(res => setTodoList(res.data));

  const resetAction = () => setAction({type: '', payload: null});

  const handleShare = (todoListId: string) => {
    setShareOpen(true);
    setId(todoListId);
  };

  const reset = () => {
    getTodoList();
    resetAction();
  };

  useEffect(() => {
    getTodoList();
  }, []);

  if (!todoList) return null;

  return (
    <div className={styles['page-list']}>
      <div className="container">
        <Topbar />
        <div className="toolbar">
          <div className="left">
            <IconButton name="ico-arrow-left-circle" size={32} onClick={() => router.push(ROUTES.ACTION)} />
            <div className="title">
              <span className="h3">TO DO</span>
              <span className="sep"></span>
              <span className="h3">YOUR LIST</span>
            </div>
          </div>
          <div className="right">
            <Button
              className="btn-create-new"
              startIcon={<Icon name="ico-plus-circle" size={28} />}
              onClick={() => setAction({type: 'add', payload: null})}
            >
              <span className="text-h5 font-medium">New List</span>
            </Button>
          </div>
        </div>
        <div className="list">
          {!todoList.length && <span>Empty list</span>}
          {todoList.map(item => (
            <div className="item" key={item.id}>
              <p className="title" onClick={() => router.push(`${ROUTES.TODO_LIST}/${item.id}`)}>
                {item.name}
              </p>
              <div className="actions">
                <IconButton name="ico-trash-2" onClick={() => setAction({type: 'delete', payload: item})} />
                <IconButton name="ico-edit" onClick={() => setAction({type: 'edit', payload: item})} />
                <IconButton name="ico-share-2" onClick={() => handleShare(item?.id)} />
                <IconButton name="ico-chevron-right" onClick={() => router.push(`${ROUTES.TODO_LIST}/${item.id}`)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <pre>{JSON.stringify(action)}</pre> */}
      {/* <pre>{['add', 'edit'].includes(action.type).toString()}</pre> */}
      {/* <ModalTodoAddEdit
        data={action.payload}
        open={['add', 'edit'].includes(action.type)}
        onSave={reset}
        onCancel={resetAction}
      /> */}

      {['add', 'edit'].includes(action.type) && (
        <ModalTodoAddEdit data={action.payload} open={true} onSave={() => reset()} onCancel={() => resetAction()} />
      )}
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
