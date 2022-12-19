import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {getErrorMessage} from '@/utils/error-handle';

import listsSlice from './slice';

function* getMylist() {
  try {
    const response: AxiosResponse<ITodolistResponse[], any> = yield call(() => api.todolist.getByUser());
    yield put(listsSlice.actions.getMyListSuccess(response.data));
  } catch (error) {
    yield put(listsSlice.actions.getMyListFailure(getErrorMessage(error)));
  }
}

function* getFavoriteList() {
  try {
    const response: AxiosResponse<ITodolistResponse[], any> = yield call(() => api.todolist.getFavorite());
    yield put(listsSlice.actions.getFavoriteListSuccess(response.data));
  } catch (error) {
    yield put(listsSlice.actions.getFavoriteListFailure(getErrorMessage(error)));
  }
}

export default function* listsSaga() {
  yield all([takeLatest(listsSlice.actions.getMyListRequest, getMylist), takeLatest(listsSlice.actions.getFavoriteListRequest, getFavoriteList)]);
}
