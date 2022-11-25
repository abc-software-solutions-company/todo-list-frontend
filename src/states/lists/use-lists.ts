import {useDispatch, useSelector} from 'react-redux';

import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {RootState} from '@/states/store';

import listsSlice from './slice';
import {ISetIsOpenModalPayload} from './types';

export default function useLists() {
  const state = useSelector((root: RootState) => root.lists);
  const {myList: myListData, favoriteList: favoriteListData, ...rest} = state;
  const myList = myListData.data;
  const favoriteList = favoriteListData.data;
  const dispatch = useDispatch();

  const {actions} = listsSlice;

  const get = () => {
    dispatch(actions.getMyListRequest());
    dispatch(actions.getFavoriteListRequest());
  };

  const setSelectedTodolist = (param?: ITodolistResponse) => dispatch(actions.setSelectedTodolist(param));
  const setIsOpenModal = (param: ISetIsOpenModalPayload) => dispatch(actions.setIsOpenModal(param));

  return {myList, favoriteList, ...rest, get, setSelectedTodolist, setIsOpenModal};
}
