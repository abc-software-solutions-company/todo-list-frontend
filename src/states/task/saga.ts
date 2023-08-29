import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {ITaskResponse, ITaskUpdate} from '@/data/api/types/task.type';
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

function* destroy({payload}: PayloadAction<ITaskUpdate>) {
  try {
    yield call(() => api.task.update(payload));
    yield put(taskSlice.actions.destroySuccess());
  } catch (error) {
    yield put(taskSlice.actions.destroyFailure(getErrorMessage(error)));
  }
}

export default function* taskSaga() {
  yield all([
    takeLatest(taskSlice.actions.getTaskRequest, getTask),
    takeLatest(taskSlice.actions.destroyRequest.type, destroy)
  ]);
}
