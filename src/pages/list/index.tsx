import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import API from '@/api/network/todo';
import {ITodo} from '@/api/types/todo.type';
import ModalShare from '@/components/modal-share';
import ModalTodoAddEdit from '@/components/modal-todo-add-edit';
import ModalTodoConfirmDelete from '@/components/modal-todo-confirm-delete';
import Seo from '@/components/seo/seo';
import {ROUTES} from '@/configs/routes.config';
import {siteSettings} from '@/configs/site.config';
import {useStateAuth} from '@/contexts/auth/context';
import Button from '@/core-ui/button';
import FloatIcon from '@/core-ui/float-icon';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import LayoutDefault from '@/layouts/default';
import {IAction} from '@/types';
import checkUnAuthorized from '@/utils/check-unauthorized';

import styles from './style.module.scss';
checkUnAuthorized();

export default function List() {
  const router = useRouter();
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);
  const [id, setId] = useState<string>('');
  const auth = useStateAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTodoList = (userId: string | any) => API.getTodos(userId).then(res => setTodoList(res.data));

  const resetAction = () => setAction({type: '', payload: null});

  const handleShare = (todoListId: string) => {
    setShareOpen(true);
    setId(todoListId);
  };

  const getUserId = () => {
    if (auth.user) return auth.user?.id;
  };

  const reset = () => {
    getTodoList(getUserId());
    resetAction();
  };

  useEffect(() => {
    getTodoList(getUserId());
  });

  if (!todoList) return null;

  return (
    <>
      <Seo title={`${siteSettings.name} | Your List`} description={siteSettings.description} />
      {auth.user && (
        <div className={styles['page-list']}>
          <div className="container">
            <div className="toolbar">
              <div className="left">
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
                  <span className="h5 font-medium">New List</span>
                </Button>
              </div>
            </div>
            <div className="list">
              {!todoList.length && <span className="empty">Empty list</span>}
              {todoList.map(item => (
                <div className="item" key={item.id}>
                  <p className="title" onClick={() => router.push(`${ROUTES.TODO_LIST}/${item.id}`)}>
                    {item.name}
                  </p>
                  <div className="actions">
                    <IconButton name="ico-trash-2" onClick={() => setAction({type: 'delete', payload: item})} />
                    <IconButton name="ico-edit" onClick={() => setAction({type: 'edit', payload: item})} />
                    <IconButton name="ico-share-2" onClick={() => handleShare(item.id!)} />
                    <IconButton
                      name="ico-chevron-right"
                      onClick={() => router.push(`${ROUTES.TODO_LIST}/${item.id}`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <FloatIcon className="float-icon" onClick={() => setAction({type: 'add', payload: null})} />
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
      )}
    </>
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
