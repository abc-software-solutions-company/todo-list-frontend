import {ROUTES} from '@/configs/routes.config';
import {siteSettings} from '@/configs/site.config';
import Button from '@/core-ui/button';
import FloatIcon from '@/core-ui/float-icon';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';

import ModalShare from '../modal-share';
import ModalTodoAddEdit from '../modal-todo-add-edit';
import ModalTodoConfirmDelete from '../modal-todo-confirm-delete';
import Seo from '../seo/seo';
import useList from './hook';
import styles from './style.module.scss';

export default function List() {
  const {router, todoList, action, shareOpen, id, handleShare, reset, setAction, resetAction, setShareOpen} = useList();

  if (!todoList) return null;

  return (
    <>
      <Seo
        title={`${siteSettings.name} | My List`}
        description={siteSettings.description}
        images={[
          {
            url: '/todolist.jpg',
            width: 1200,
            height: 630,
            alt: 'To-Do List | My List'
          }
        ]}
      />
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
                <p className="title" onClick={() => router.push(`${ROUTES.LIST}/${item.id}`)}>
                  {item.name}
                </p>
                <div className="actions">
                  <IconButton name="ico-edit" onClick={() => setAction({type: 'edit', payload: item})} />
                  <IconButton name="ico-trash-2" onClick={() => setAction({type: 'delete', payload: item})} />
                  <IconButton name="ico-share-2" onClick={() => handleShare(item.id!)} />
                  <IconButton name="ico-chevron-right" onClick={() => router.push(`${ROUTES.LIST}/${item.id}`)} />
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
    </>
  );
}
