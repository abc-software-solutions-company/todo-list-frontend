import {useDispatch, useSelector} from 'react-redux';

import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {useStateAuth} from '@/states/auth';
import {RootState, todolistSlice} from '@/states/store';

import {ISetIsOpenModalPayload} from './types';

export default function useTodolist() {
  const todolistState = useSelector((root: RootState) => root.todolist);
  const {data, loading, error, statusList, statusActive, ...rest} = todolistState;
  const auth = useStateAuth();
  const dispatch = useDispatch();

  const {actions} = todolistSlice;

  const getTodolist = (id: string) => dispatch(actions.getTodolistRequest({id}));
  const update = () => dispatch(actions.getTodolistRequest({id: data.id}));
  const setTodolist = (value: ITodolistResponse) => dispatch(actions.setTodolist(value));
  const setStatusFilter = (value: number) => dispatch(actions.setStatusFilter(value));

  const setSelectedTask = (value?: ITaskResponse) => dispatch(actions.setSelectedTask(value));
  const setIsOpenModal = (value: ISetIsOpenModalPayload) => dispatch(actions.setIsOpenModal(value));

  const assest = Boolean(data) ? data.visibility !== 'PRIVATE' || Boolean(auth && auth.id === data.userId) : false;
  const write = Boolean(data) ? data.visibility === 'PUBLIC' || Boolean(auth && auth.id === data.userId) : false;
  const owner = Boolean(data) ? Boolean(auth && auth.id === data.userId) : false;
  return {
    todolist: data,
    loading,
    statusList,
    statusActive,
    ...rest,
    assest,
    write,
    owner,
    error,
    getTodolist,
    update,
    setStatusFilter,
    setSelectedTask,
    setIsOpenModal,
    setTodolist
  };
}
