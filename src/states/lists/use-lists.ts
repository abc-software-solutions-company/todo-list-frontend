import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '@/states/store';

import listsSlice from './slice';

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

  return {myList, favoriteList, ...rest, get, myListState: state};
}
