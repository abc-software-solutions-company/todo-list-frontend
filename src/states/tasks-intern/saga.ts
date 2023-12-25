import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {getErrorMessage} from '@/utils/error-handle';

import tasksSlice from './slice';
import { ITaskResponse } from '@/data/api/types/task.type';

function* getTasksIntern() {
  try {
    const response: AxiosResponse<ITaskResponse[], any> = yield call(() => api.task.get());
    console.log("🚀🚀🚀 -> function*getTasks -> response:::", response);
    yield put(tasksSlice.actions.getTasksInternSuccess(response.data));
  } catch (error) {
    yield put(tasksSlice.actions.getTasksInternFailure(getErrorMessage(error)));
  }
}

export default function* tasksInternSaga() {
  yield all([takeLatest(tasksSlice.actions.getTasksInternRequest, getTasksIntern)]);
}
