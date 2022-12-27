import {useDispatch, useSelector} from 'react-redux';

import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {useStateAuth} from '@/states/auth';
import {boardSlice, RootState} from '@/states/store';

import {ISetIsOpenModalPayload} from './types';

export default function useBoards() {
  const boardState = useSelector((root: RootState) => root.board);
  const {isOpenModal, board, ...rest} = boardState;
  const {data, ...restBoard} = board;
  const auth = useStateAuth();
  const dispatch = useDispatch();

  const {actions} = boardSlice;

  const getBoard = (id: string) => dispatch(actions.getBoardRequest({id}));
  const update = () => dispatch(actions.getBoardRequest({id: data.id}));
  const setBoard = (value: ITodolistResponse) => dispatch(actions.setBoard(value));
  const setStatusFilter = (value: number) => dispatch(actions.setStatusFilter(value));

  const setIsOpenModal = (value: ISetIsOpenModalPayload) => dispatch(actions.setIsOpenModal(value));

  const assest = Boolean(data) ? data.visibility !== 'PRIVATE' || Boolean(auth && auth.id === data.userId) : false;
  const write = Boolean(data) ? data.visibility === 'PUBLIC' || Boolean(auth && auth.id === data.userId) : false;
  const owner = Boolean(data) ? Boolean(auth && auth.id === data.userId) : false;
  const error = board.error;
  return {
    boardData: data,
    ...rest,
    ...restBoard,
    assest,
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
