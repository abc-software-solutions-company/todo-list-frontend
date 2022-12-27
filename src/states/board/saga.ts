import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {getErrorMessage} from '@/utils/error-handle';

import boardSlice from './slice';
import {IGetBoardPayloadAction} from './types';

function* getBoard({payload}: IGetBoardPayloadAction) {
  try {
    const response: AxiosResponse<ITodolistResponse, any> = yield call(() => api.todolist.getOne(payload));
    console.log(response);

    yield put(boardSlice.actions.getBoardSuccess(response.data));
  } catch (error) {
    yield put(boardSlice.actions.getBoardFailure(getErrorMessage(error)));
  }
}

export default function* kanbanSaga() {
  yield all([takeLatest(boardSlice.actions.getBoardRequest, getBoard)]);
}
