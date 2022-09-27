import React from 'react';

import ModalShare from '@/components/modal-share';
import ModalTaskAddEdit from '@/components/modal-task-add-edit';
import ModalTaskConfirmDelete from '@/components/modal-task-confirm-delete';
import ModalTodoAddEdit from '@/components/modal-todo-add-edit';
import ModalTodoConfirmDelete from '@/components/modal-todo-confirm-delete';
import Button from '@/core-ui/button';
import Checkbox from '@/core-ui/checkbox';
import FloatIcon from '@/core-ui/float-icon';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import LayoutDefault from '@/layouts/default';

import useListDetail from './hook';
import styles from './style.module.scss';

export default function Detail() {
  const {
    todoList,
    action,
    shareOpen,
    id,
    handleShare,
    reset,
    setActionTodo,
    setDone,
    page,
    setShareOpen,
    setAction,
    resetAction,
    actionTodo,
    resetActionTodo
  } = useListDetail();
  if (!todoList || !id) return null;

  return (
    <>
      <div className={styles['page-detail']}>
        <div className="container">
          <div className="toolbar">
            <div className="left">
              <div className="title">
                <h2>{todoList.name}</h2>
              </div>
            </div>
            <div className="right">
              <Button
                className="btn-edit"
                startIcon={<Icon name="ico-edit" />}
                onClick={() => setActionTodo({type: 'edit', payload: todoList})}
              >
                <span className="h5 font-medium">Edit</span>
              </Button>
              <Button
                startIcon={<Icon name="ico-trash-2" />}
                onClick={() => setActionTodo({type: 'delete', payload: todoList})}
              >
                <span className="h5 font-medium">Delete List</span>
              </Button>
              <Button className="btn-share" startIcon={<Icon name="ico-share-2" />} onClick={handleShare}>
                <span className="h5 font-medium">Share</span>
              </Button>
              <Button
                className="btn-add-todo"
                startIcon={<Icon name="ico-plus-circle" />}
                onClick={() => setAction({type: 'add', payload: null})}
              >
                <span className="h5 font-medium">Add To-Do</span>
              </Button>
            </div>
          </div>
          <div className="tasks">
            {!todoList?.tasks!.length && <span className="empty">Empty list</span>}
            {todoList.tasks &&
              todoList.tasks.map(task => (
                <div className="item" key={task.id}>
                  <Checkbox checked={task.isDone} onChange={() => setDone(task.id!)} />
                  <p onClick={() => setDone(task.id!)} className={`h6 ${task.isDone ? 'checked' : ''}`}>
                    {task.name}
                  </p>
                  <div className="actions">
                    <IconButton name="ico-edit" onClick={() => setAction({type: 'edit', payload: task})} />
                    <IconButton name="ico-trash-2" onClick={() => setAction({type: 'delete', payload: task})} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <FloatIcon className="float-icon" onClick={() => setAction({type: 'add', payload: null})} />
        {['add', 'edit'].includes(action.type) && (
          <ModalTaskAddEdit
            data={action.payload}
            todoListId={id.toString()}
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
        <FloatIcon className="float-icon" onClick={() => setAction({type: 'add', payload: null})} />
        {['add', 'edit'].includes(actionTodo.type) && (
          <ModalTodoAddEdit
            data={actionTodo.payload}
            open={true}
            onSave={() => reset()}
            onCancel={() => resetActionTodo()}
          />
        )}
        <ModalTodoConfirmDelete
          open={['delete'].includes(actionTodo.type)}
          data={actionTodo.payload}
          page={page}
          onConfirm={reset}
          onCancel={resetActionTodo}
        />
        <ModalShare open={shareOpen} onClose={() => setShareOpen(false)} id={String(id) || ''} />
      </div>
    </>
  );
}

Detail.Layout = LayoutDefault;
