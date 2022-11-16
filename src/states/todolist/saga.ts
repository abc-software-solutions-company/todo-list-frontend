import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {getErrorMessage} from '@/utils/error-handle';

import todolistSlice from './slice';
import {IGetTodolistPayloadAction} from './types';

function* getTodolist({payload}: IGetTodolistPayloadAction) {
  try {
    const response: AxiosResponse<ITodolistResponse, any> = yield call(() => api.todolist.getOne(payload));
    console.log(response);
    yield put(todolistSlice.actions.getTodolistSuccess(response.data));
  } catch (error) {
    yield put(todolistSlice.actions.getTodolistFailure(getErrorMessage(error)));
  }
}

export default function* todolistSaga() {
  yield all([takeLatest(todolistSlice.actions.getTodolistRequest, getTodolist)]);
}
