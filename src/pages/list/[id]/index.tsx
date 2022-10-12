/* eslint-disable react-hooks/rules-of-hooks */
import {DndContext, DragEndEvent, DragOverlay, UniqueIdentifier} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {InferGetStaticPropsType} from 'next';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

import API from '@/api/network/task';
import {ITask} from '@/api/types/task.type';
import {ITodo} from '@/api/types/todo.type';
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
import {useMouseSensor} from '@/lib/dnd-kit/sensor/sensor-group';
import {IAction} from '@/types';
import LocalStorage from '@/utils/local-storage';

import styles from './style.module.scss';

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

export {getStaticPaths, getStaticProps};

export default function Detail({title, description}: InferGetStaticPropsType<typeof getStaticProps>) {
  const sensor = useMouseSensor();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

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

  const handleShare = () => setShareOpen(true);

  const resetAction = () => setAction({type: '', payload: null});
  const resetActionTodo = () => setActionTodo({type: '', payload: null});

  const reset = () => {
    getListTasks(String(id) || '');
    resetAction();
    resetActionTodo();
    socketMsgToServer();
  };

  function handleDragEnd({active, over}: DragEndEvent) {
    console.log(todoList);

    // console.log(active);
    // console.log(over);

    setActiveId(null);
    if (!over) return;
    if (active.id !== over.id) {
      const taskList: ITask[] = todoList!.tasks!;
      const oldIndex = taskList?.findIndex(item => active.id === item.id);
      const newIndex = taskList?.findIndex(item => over.id === item.id);
      const arrangeTask = arrayMove(todoList!.tasks!, oldIndex!, newIndex!);
      setTodoList({...todoList, tasks: arrangeTask});

      arrangeTask.forEach((element, index) => {
        if (element.id === active.id) {
          const taskFirstId = arrangeTask[index - 1]?.id;
          const taskReorderId = arrangeTask[index].id;
          const taskSecondId = arrangeTask[index + 1]?.id;
          console.log(
            `taskFirstID is ${taskFirstId},
            taskSecondID is ${taskSecondId},
            taskReorderId is ${taskReorderId}`
          );
          API.reorderTask({
            taskFirstID: taskFirstId,
            taskReorderID: taskReorderId,
            taskSecondID: taskSecondId
          }).then(() => getListTasks(String(id) || ''));
        }
      });
    }
  }

  useEffect(() => {
    if (id) {
      getListTasks(String(id) || '').catch(() => router.push(ROUTES.LIST));
      socket.on(`msgToClient_${id}`, () => {
        getListTasks(String(id) || '').catch(() => router.push(ROUTES.LIST));
      });
      LocalStorage.previousPage.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      socket.off(`msgToClient_${id}`);
    };
  }, [id]);

  if (!todoList || !id) return <Seo title={title} description={description} />;

  return (
    <>
      <Seo title={title} description={description} />;
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
          <DndContext
            sensors={sensor}
            onDragCancel={() => setActiveId(null)}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
            onDragStart={({active}) => {
              if (!active) {
                return;
              }

              setActiveId(active.id);
            }}
          >
            <div className="tasks">
              {!todoList?.tasks!.length ? <span className="empty">Empty list</span> : ''}
              {todoList.tasks?.length ? (
                <SortableContext items={todoList.tasks.map(task => task.id!)} strategy={verticalListSortingStrategy}>
                  {todoList.tasks &&
                    todoList.tasks.map(task => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        msgToServer={socketMsgToServer}
                        refreshList={() => getListTasks(String(id) || '')}
                        editTask={() => setAction({type: 'edit', payload: task})}
                        deleteTask={() => setAction({type: 'delete', payload: task})}
                      />
                    ))}
                </SortableContext>
              ) : (
                <></>
              )}
              <DragOverlay>
                {activeId ? <TaskItem task={todoList.tasks?.filter(e => e.id === activeId)[0]} /> : null}
              </DragOverlay>
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
