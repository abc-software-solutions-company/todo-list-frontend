import {useDispatch, useSelector} from 'react-redux';

import {useStateAuth} from '@/states/auth';
import {boardSlice, RootState} from '@/states/store';

import {ISetIsOpenModalPayload} from './types';

export default function useBoards() {
  const boardState = useSelector((root: RootState) => root.board);
  const {isOpenModal, board, listID, ...rest} = boardState;
  const {data, ...restBoard} = board;
  const auth = useStateAuth();
  const dispatch = useDispatch();

  const {actions} = boardSlice;

  const getBoard = (id: string) => dispatch(actions.getBoardRequest({id}));
  const update = () => dispatch(actions.getBoardRequest({id: data.id}));
  const setBoard = (value: any) => dispatch(actions.setBoard(value));
  const setStatusFilter = (value: number) => dispatch(actions.setStatusFilter(value));

  const setIsOpenModal = (value: ISetIsOpenModalPayload) => dispatch(actions.setIsOpenModal(value));

  const haveAccessPermission = Boolean(data)
    ? data.visibility !== 'PRIVATE' ||
      Boolean(auth && auth.id === data.userId) ||
      Boolean(auth && data?.members?.map(e => e.id).includes(auth?.id))
    : false;
  const write = Boolean(data)
    ? data.visibility === 'PUBLIC' ||
      Boolean(auth && auth.id === data.userId) ||
      Boolean(auth && data?.members?.map(e => e.id).includes(auth?.id))
    : false;
  const owner = Boolean(data) ? Boolean(auth && auth.id === data.userId) : false;
  const error = board.error;
  return {
    listID,
    boardData: data,
    ...rest,
    ...restBoard,
    haveAccessPermission,
    write,
    owner,
    error,
    getBoard,
    update,
    setStatusFilter,
    setIsOpenModal,
    setBoard
  };
}
