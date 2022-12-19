import {useDispatch, useSelector} from 'react-redux';

import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistKanbanResponse} from '@/data/api/types/todolist.type';
import {useStateAuth} from '@/states/auth';
import {RootState, todolistKanbanSlice} from '@/states/store';

import {ISetIsOpenModalPayload} from './types';

export default function useTodolistKanban() {
  const todolistKanbanState = useSelector((root: RootState) => root.todolistKanban);
  const {todolistKanban, ...rest} = todolistKanbanState;
  const {data, ...restTodolistKanban} = todolistKanban;
  const auth = useStateAuth();
  const dispatch = useDispatch();

  const {actions} = todolistKanbanSlice;

  const initial = (id: string) => dispatch(actions.getTodolistKanbanRequest({id}));
  const update = () => dispatch(actions.getTodolistKanbanRequest({id: data.id}));
  const setTodolistKanban = (value: ITodolistKanbanResponse) => dispatch(actions.setTodolistKanban(value));
  const setStatusFilter = (value: number) => dispatch(actions.setStatusFilter(value));
  const setSelectedTask = (value?: ITaskResponse) => dispatch(actions.setSelectedTask(value));
  const setIsOpenModal = (value: ISetIsOpenModalPayload) => dispatch(actions.setIsOpenModal(value));

  const assest = Boolean(data) ? data.visibility !== 'PRIVATE' || Boolean(auth && auth.id === data.userId) : false;
  const write = Boolean(data) ? data.visibility === 'PUBLIC' || Boolean(auth && auth.id === data.userId) : false;
  const owner = Boolean(data) ? Boolean(auth && auth.id === data.userId) : false;
  const error = todolistKanban.error;
  return {
    todolistKanban: data,
    ...restTodolistKanban,
    ...rest,
    assest,
    write,
    owner,
    error,
    initial,
    update,
    setStatusFilter,
    setSelectedTask,
    setIsOpenModal,
    setTodolistKanban
  };
}
