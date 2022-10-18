import {DndContext, DragEndEvent, DragOverlay} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React, {FC, useEffect} from 'react';

import ModalTodoAddEdit from '@/components/modal/modal-create-update-list';
import ModalTaskAddEdit from '@/components/modal/modal-create-update-task';
import ModalTaskConfirmDelete from '@/components/modal/modal-delete-task';
import ModalShareList from '@/components/modal/modal-share-list';
import TaskItem from '@/components/task-item';
import ToolbarDetail from '@/components/toolbar-detail';
import {ROUTES} from '@/configs/routes.config';
import FloatIcon from '@/core-ui/float-icon';
import api from '@/data/api';
import {ITask} from '@/data/api/types/task.type';
import socket from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';

import useListDetail, {IListDetailProp} from './hooks';
import styles from './style.module.scss';

const ListDetail: FC<IListDetailProp> = ({id}) => {
  const {
    activeId,
    auth,
    sensor,
    setActiveId,
    action,
    actionTodo,
    setAction,
    setActionTodo,
    setShareOpen,
    setTodoList,
    shareOpen,
    todoList,
    router,
    getListTasks,
    handleShare,
    resetAction,
    resetActionTodo
  } = useListDetail();
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
    // Send param auth,id, getListTasks
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
  }, []);

  if (!todoList || !id) return null;

  return (
    <>
      <div className={styles['list-detail']}>
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
              <DragOverlay>{activeId ? <TaskItem task={todoList.tasks?.filter(e => e.id === activeId)[0]} /> : null}</DragOverlay>
            </div>
          </DndContext>
        </div>

        {/* Modal Components Area */}
        <FloatIcon className="float-icon" onClick={() => setAction({type: 'add', payload: null})} />
        {['add', 'edit'].includes(action.type) && (
          <ModalTaskAddEdit data={action.payload} todoListId={id.toString()} open={true} onSave={() => reset()} onCancel={() => resetAction()} />
        )}
        {['delete'].includes(action.type) && (
          <ModalTaskConfirmDelete data={action.payload} open={true} onConfirm={() => reset()} onCancel={() => resetAction()} />
        )}
        <FloatIcon className="float-icon" onClick={() => setAction({type: 'add', payload: null})} />
        {['add', 'edit'].includes(actionTodo.type) && (
          <ModalTodoAddEdit data={actionTodo.payload} open={true} onSave={() => reset()} onCancel={() => resetActionTodo()} />
        )}
        {/* <ModalDeleteList open={['delete'].includes(actionTodo.type)} data={actionTodo.payload} page={page} onConfirm={reset} onCancel={resetActionTodo} /> */}
        <ModalShareList open={shareOpen} onClose={() => setShareOpen(false)} id={id} />
      </div>
    </>
  );
};

export default ListDetail;
