import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {getErrorMessage} from '@/utils/error-handle';

import taskSlice, {IAction} from './slice';

function* getTask({payload}: IAction) {
  try {
    const response: AxiosResponse<ITaskResponse, any> = yield call(() => api.task.getOne(payload));
    yield put(taskSlice.actions.getTaskSuccess(response.data));
  } catch (error) {
    yield put(taskSlice.actions.getTaskFailure(getErrorMessage(error)));
  }
}

export default function* taskSaga() {
  yield all([takeLatest(taskSlice.actions.getTaskRequest, getTask)]);
}
