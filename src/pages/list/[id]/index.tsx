/* eslint-disable react-hooks/rules-of-hooks */
import {DndContext, KeyboardSensor, MouseSensor, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {SortableContext, arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import {InferGetStaticPropsType} from 'next';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

import API from '@/api/network/task';
import {ITodo} from '@/api/types/todo.type';
import ListTask from '@/components/list-task';
import ModalShare from '@/components/modal-share';
import ModalTaskAddEdit from '@/components/modal-task-add-edit';
import ModalTaskConfirmDelete from '@/components/modal-task-confirm-delete';
import ModalTodoAddEdit from '@/components/modal-todo-add-edit';
import ModalTodoConfirmDelete from '@/components/modal-todo-confirm-delete';
import Seo from '@/components/seo/seo';
import TaskItem from '@/components/task-item';
import ToolbarDetail from '@/components/toolbar-detail';
import {ROUTES} from '@/configs/routes.config';
import FloatIcon from '@/core-ui/float-icon';
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

  // const sensors = useSensors(
  //   useSensor(MouseSensor, {
  //     activationConstraint: {
  //       delay: 500
  //     }
  //   })
  // );

  return (
    <>
      <Seo title={roomId} />
      <div className={styles['page-detail']}>
        <div className="container">
          {todoList.name && (
            <ToolbarDetail
              nameTodo={todoList.name || ''}
              editTodo={() => setActionTodo({type: 'edit', payload: todoList})}
              deleteTodo={() => setActionTodo({type: 'delete', payload: todoList})}
              shareTodo={handleShare}
              addTodo={() => setAction({type: 'add', payload: null})}
            />
          )}
          <div className="tasks">
            {!todoList?.tasks!.length && <span className="empty">Empty list</span>}
            {todoList.tasks?.length && (
              <ListTask
                list={todoList.tasks}
                listID={id.toString()}
                msgToServer={socketMsgToServer}
                refreshList={() => getListTasks(String(id) || '')}
              />
            )}
          </div>
          <p>This below is dnd context area</p>
          <DndContext onDragEnd={handleDragEnd}>
            <div className="tasks">
              {!todoList?.tasks!.length && <span className="empty">Empty list</span>}
              {todoList.tasks?.length && (
                <SortableContext items={todoList.tasks}>
                  {todoList.tasks &&
                    todoList.tasks.map(task => (
                      <div key={task.id}>
                        {/* <SortableItem key={task.id} id={task.id} title={task.name} content={task.name} /> */}
                        <TaskItem
                          task={task}
                          msgToServer={socketMsgToServer}
                          refreshList={() => getListTasks(String(id) || '')}
                        />
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
