import {useDispatch, useSelector} from 'react-redux';

import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistKanbanResponse} from '@/data/api/types/todolist.type';
import {useStateAuth} from '@/states/auth';
import {RootState, todolistSlice} from '@/states/store';

import {ISetIsOpenModalPayload} from './types';

export default function useTodolist() {
  const todolistState = useSelector((root: RootState) => root.todolist);
  const {todolist, kanbanActive, statusActive, ...rest} = todolistState;
  const {data, statusList, ...restTodolistKanban} = todolist;
  const auth = useStateAuth();
  const dispatch = useDispatch();

  const {actions} = todolistSlice;

  const getTodolist = (id: string) => dispatch(actions.getTodolistRequest({id}));
  const update = () => dispatch(actions.getTodolistRequest({id: data.id}));
  const setTodolist = (value: ITodolistKanbanResponse) => dispatch(actions.setTodolist(value));
  const setStatusFilter = (value: number) => dispatch(actions.setStatusFilter(value));
  const setStatusActive = (value: number) => dispatch(actions.setStatusActive(value));
  const setSelectedTask = (value?: ITaskResponse) => dispatch(actions.setSelectedTask(value));
  const setIsOpenModal = (value: ISetIsOpenModalPayload) => dispatch(actions.setIsOpenModal(value));

  const assest = Boolean(data) ? data.visibility !== 'PRIVATE' || Boolean(auth && auth.id === data.userId) : false;
  const write = Boolean(data) ? data.visibility === 'PUBLIC' || Boolean(auth && auth.id === data.userId) : false;
  const owner = Boolean(data) ? Boolean(auth && auth.id === data.userId) : false;
  const error = todolist.error;
  return {
    todolist: data,
    ...restTodolistKanban,
    ...rest,
    statusList,
    statusActive,
    kanbanActive,
    assest,
    write,
    owner,
    error,
    getTodolist,
    update,
    setStatusFilter,
    setStatusActive,
    setSelectedTask,
    setIsOpenModal,
    setTodolist
  };
}
