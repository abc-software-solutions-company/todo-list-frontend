import {DndContext} from '@dnd-kit/core';
import {SortableContext, arrayMove} from '@dnd-kit/sortable';
import {InferGetStaticPropsType} from 'next';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

import API from '@/api/network/task';
import {ITodo} from '@/api/types/todo.type';
import ModalShare from '@/components/modal-share';
import ModalTaskAddEdit from '@/components/modal-task-add-edit';
import ModalTaskConfirmDelete from '@/components/modal-task-confirm-delete';
import ModalTodoAddEdit from '@/components/modal-todo-add-edit';
import ModalTodoConfirmDelete from '@/components/modal-todo-confirm-delete';
import Seo from '@/components/seo/seo';
import ToolbarDetail from '@/components/toolbar-detail';
import {ROUTES} from '@/configs/routes.config';
import Checkbox from '@/core-ui/checkbox';
import FloatIcon from '@/core-ui/float-icon';
import IconButton from '@/core-ui/icon-button';
import {getStaticPaths, getStaticProps} from '@/data/ssr/room.ssr';
import LayoutDefault from '@/layouts/default';
import SortableItem from '@/pages/dnd-sortable/SortableItem';
import {IAction} from '@/types';
import LocalStorage from '@/utils/local-storage';

import styles from './style.module.scss';

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

export {getStaticPaths, getStaticProps};

export default function Detail({roomId}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const [todoList, setTodoList] = useState<ITodo>();
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [actionTodo, setActionTodo] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);

  const {id} = router.query;
  const page = 'detail';

  const socketMsgToServer = () => socket.emit('msgToServer', {roomId: id});

  const getListTasks = (todoListId: string) =>
    API.getListTasks(todoListId)
      .then(res => {
        if (res.status >= 200) setTodoList(res.data);
      })
      .catch(() => {
        router.push(ROUTES.LIST);
      });

  const handleShare = () => {
    setShareOpen(true);
  };

  const setDone = (taskId: string) => {
    if (!taskId) return;
    API.updateStatusTask(taskId).then(() => {
      getListTasks(String(id) || '');
      socketMsgToServer();
    });
  };

  const resetAction = () => setAction({type: '', payload: null});
  const resetActionTodo = () => setActionTodo({type: '', payload: null});
  const socketMsgToClient = () => {
    socket.on(`msgToClient_${id}`, () => {
      getListTasks(String(id) || '').catch(() => router.push(ROUTES.LIST));
    });
  };

  const reset = () => {
    getListTasks(String(id) || '');
    resetAction();
    resetActionTodo();
    socketMsgToServer();
  };

  useEffect(() => {
    if (id) {
      getListTasks(String(id) || '').catch(() => router.push(ROUTES.LIST));
      socketMsgToClient();
      LocalStorage.previousPage.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!todoList || !id)
    return (
      <>
        <Seo title={roomId} />
      </>
    );

  function handleDragEnd(event: any) {
    const {active, over} = event;
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = todoList?.tasks?.findIndex(item => active.id === item.id);
      const newIndex = todoList?.tasks?.findIndex(item => over.id === item.id);

      const arrangeTask = arrayMove(todoList?.tasks, oldIndex, newIndex);
      // console.log(arrangeTask);

      setTodoList({...todoList, tasks: arrangeTask});
    }
    // console.log(todoList);
  }

  return (
    <>
      <Seo title={roomId} />
      <div className={styles['page-detail']}>
        <div className="container">
          <ToolbarDetail
            todoList={todoList}
            editTodo={() => setActionTodo({type: 'edit', payload: todoList})}
            deleteTodo={() => setActionTodo({type: 'delete', payload: todoList})}
            shareTodo={handleShare}
            addTodo={() => setActionTodo({type: 'add', payload: null})}
          />
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
          <DndContext onDragEnd={handleDragEnd}>
            <div className="tasks">
              {!todoList?.tasks!.length && <span className="empty">Empty list</span>}
              {todoList.tasks?.length && (
                <SortableContext items={todoList.tasks}>
                  {todoList.tasks &&
                    todoList.tasks.map(task => (
                      <div className="item" key={task.id}>
                        <SortableItem key={task.id} id={task.id} title={task.name} content={task.name} />
                      </div>
                    ))}
                </SortableContext>
              )}
            </div>
          </DndContext>
        </div>

        {/* Modal Components Area */}
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
