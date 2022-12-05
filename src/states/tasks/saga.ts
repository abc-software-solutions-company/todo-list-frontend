import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {getErrorMessage} from '@/utils/error-handle';

import tasksSlice from './slice';

function* getMyTasks() {
  try {
    const response: AxiosResponse<ITodolistResponse[], any> = yield call(() => api.todolist.getMyTasks());
    yield put(tasksSlice.actions.getMyTasksSuccess(response.data));
  } catch (error) {
    yield put(tasksSlice.actions.getMyTasksFailure(getErrorMessage(error)));
  }
}

export default function* tasksSaga() {
  yield all([takeLatest(tasksSlice.actions.getMyTasksRequest, getMyTasks)]);
}
