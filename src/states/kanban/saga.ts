import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {ITodolistKanbanResponse} from '@/data/api/types/todolist.type';
import {getErrorMessage} from '@/utils/error-handle';

import kanbanSlice from './slice';

function* getMylist() {
  try {
    const response: AxiosResponse<ITodolistKanbanResponse[], any> = yield call(() => api.todolist.getByUser());
    yield put(kanbanSlice.actions.getMyListSuccess(response.data));
  } catch (error) {
    yield put(kanbanSlice.actions.getMyListFailure(getErrorMessage(error)));
  }
}

function* getFavoriteList() {
  try {
    const response: AxiosResponse<ITodolistKanbanResponse[], any> = yield call(() => api.todolist.getFavorite());
    yield put(kanbanSlice.actions.getFavoriteListSuccess(response.data));
  } catch (error) {
    yield put(kanbanSlice.actions.getFavoriteListFailure(getErrorMessage(error)));
  }
}

export default function* listsSaga() {
  yield all([
    takeLatest(kanbanSlice.actions.getMyListRequest, getMylist),
    takeLatest(kanbanSlice.actions.getFavoriteListRequest, getFavoriteList)
  ]);
}
