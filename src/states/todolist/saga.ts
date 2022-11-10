import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {getErrorMessage} from '@/utils/error-handle';

import postSlice, {IAction} from './slice';

function* getTodolist({payload}: IAction) {
  try {
    const response: AxiosResponse<ITodolistResponse, any> = yield call(() => api.todolist.getOne(payload));
    console.log(response);
    yield put(postSlice.actions.getTodolistSuccess(response.data));
  } catch (error) {
    yield put(postSlice.actions.getTodolistFailure(getErrorMessage(error)));
  }
}

export default function* todolistSaga() {
  yield all([takeLatest(postSlice.actions.getTodolistRequest, getTodolist)]);
}
