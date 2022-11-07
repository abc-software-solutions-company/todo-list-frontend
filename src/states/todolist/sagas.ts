import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/list.type';
import {IAxiosResponse} from '@/types';
import {getErrorMessage} from '@/utils/error-handle';

import postSlice from './slice';

function* getTodolist(param: any) {
  console.log('🚀 ~ file: sagas.ts ~ line 10 ~ function*getTodolist ~ param', param.payload);
  try {
    const response: IAxiosResponse<ITodolistResponse> = yield call(() => api.list.getOne(param));
    console.log(response);
    yield put(postSlice.actions.getTodolistSuccess(response.data));
  } catch (error) {
    yield put(postSlice.actions.getTodolistFailure(getErrorMessage(error)));
  }
}

// function* getPost() {
//   try {
//   } catch (error) {}
// }

export default function* postSaga() {
  yield all([
    takeLatest(postSlice.actions.getTodolistRequest, getTodolist)
    // takeLatest(postSlice.actions.getPost, getPost),
  ]);
}
