/* eslint-disable react-hooks/rules-of-hooks */
import {DndContext, DragEndEvent, DragOverlay, UniqueIdentifier} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {useRouter} from 'next/router';
import React, {FC, useEffect, useState} from 'react';

import ModalTodoAddEdit from '@/components/modal-list-add-edit';
import ModalTodoConfirmDelete from '@/components/modal-list-confirm-delete';
import ModalShare from '@/components/modal-share';
import ModalTaskAddEdit from '@/components/modal-task-add-edit';
import ModalTaskConfirmDelete from '@/components/modal-task-confirm-delete';
import TaskItem from '@/components/task-item';
import ToolbarDetail from '@/components/toolbar-detail';
import {ROUTES} from '@/configs/routes.config';
import FloatIcon from '@/core-ui/float-icon';
import api from '@/data/api';
// import {ITask} from '@/api/types/task.type';
// import {ITaskByListDetail} from '@/api/types/todo.type';
import {ITask, ITaskByListDetail} from '@/data/api/types/task.type';
import socket from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
// import {getStaticPaths, getStaticProps} from '@/data/ssr/room.ssr';
import {useMouseSensor} from '@/lib/dnd-kit/sensor/sensor-group';
import {useStateAuth} from '@/states/auth';
import {IAction} from '@/types';

import styles from './style.module.scss';

// export {getStaticPaths, getStaticProps};

const Detail: FC = () => {
  const auth = useStateAuth();
  const sensor = useMouseSensor();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const router = useRouter();
  const [todoList, setTodoList] = useState<ITaskByListDetail>();
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [actionTodo, setActionTodo] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);

  const id = router.query.id as string;
  const page = 'detail';

  const getListTasks = (todoListId: string | undefined) => {
    if (todoListId) {
      return api.task
        .getByList({todoListId})
        .then(res => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const {tasks, name, id} = res.data;
          if (res.status >= 200) setTodoList({tasks, name, id});
        })
        .catch(() => {
          router.push(ROUTES.LIST);
        });
    } else return Promise.reject('err');
  };

  const handleShare = () => setShareOpen(true);

  // Modal task
  const resetAction = () => setAction({type: '', payload: null});
  const resetActionTodo = () => setActionTodo({type: '', payload: null});

  const reset = () => {
    getListTasks(id);
    resetAction();
    resetActionTodo();
  };

  function handleDragEnd({active, over}: DragEndEvent) {
    setActiveId(null);
    if (!over) return;
    if (active.id !== over.id) {
      const taskList: ITask[] = todoList!.tasks;
      const oldIndex = taskList?.findIndex(item => active.id === item.id);
      const newIndex = taskList?.findIndex(item => over.id === item.id);
      const arrangeTask = arrayMove(todoList!.tasks, oldIndex!, newIndex!);
      setTodoList({name: todoList?.name, tasks: arrangeTask, id});

      arrangeTask.forEach((element, index) => {
        if (element.id === active.id) {
          const taskFirstId = arrangeTask[index - 1]?.id;
          const taskReorderId = arrangeTask[index].id!;
          const taskSecondId = arrangeTask[index + 1]?.id;
          console.log(
            `taskFirstID is ${taskFirstId},
            taskSecondID is ${taskSecondId},
            taskReorderId is ${taskReorderId}`
          );
          api.task.reIndex({taskFirstId, taskReorderId, taskSecondId}).then(() => getListTasks(id));
        }
      });
    }
  }

  useEffect(() => {
    if (id) getListTasks(id).catch(() => router.push(ROUTES.LIST));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: id};
      socket.connect();
    }

    socket.on(SOCKET_EVENTS.reconnect, attempt => {
      console.log('SocketIO', SOCKET_EVENTS.reconnect, attempt);
      getListTasks(id);
    });

    socket.on(SOCKET_EVENTS.updateList, () => {
      console.log('SocketIO', SOCKET_EVENTS.updateList);
      getListTasks(id);
    });
  });

  if (!todoList || !id) return null;

  return (
    <>
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
              {/* {console.log(todoList)} */}
              {!todoList?.tasks.length ? <span className="empty">Empty list</span> : ''}

              {todoList.tasks.length ? (
                <SortableContext items={todoList.tasks.map(task => task.id!)} strategy={verticalListSortingStrategy}>
                  {todoList.tasks &&
                    todoList.tasks.map(task => (
                      <TaskItem
                        key={task.id}
                        task={task}
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
        <ModalShare open={shareOpen} onClose={() => setShareOpen(false)} id={id} />
      </div>
    </>
  );
};

export default Detail;

// Detail.layout = LayoutDefault;
