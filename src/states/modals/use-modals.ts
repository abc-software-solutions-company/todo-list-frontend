import {useDispatch, useSelector} from 'react-redux';

import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistKanbanResponse, ITodolistResponse} from '@/data/api/types/todolist.type';

import {RootState} from '../store';
import modalsSlice from './slice';
import {ISetIsOpenModalPayload} from './types';

export default function useModals() {
  const modalsState = useSelector((root: RootState) => root.modals);
  const {...modals} = modalsState;

  const {actions} = modalsSlice;

  const dispatch = useDispatch();
  const setIsOpenModal = (value: ISetIsOpenModalPayload) => dispatch(actions.setIsOpenModal(value));
  const setSelectedTask = (value?: ITaskResponse) => dispatch(actions.setSelectedTask(value));
  const setSelectedTodolist = (value?: ITodolistResponse | ITodolistKanbanResponse) =>
    dispatch(actions.setSelectedTodolist(value));
  const setSelectedColumnId = (value?: number) => dispatch(actions.setSelectedColumnId(value));

  return {...modals, setIsOpenModal, setSelectedTask, setSelectedTodolist, setSelectedColumnId};
}
