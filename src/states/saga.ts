import {all, fork} from 'redux-saga/effects';

import listsSaga from './lists/saga';
import taskSaga from './task/saga';
import tasksSaga from './tasks/saga';
import todolistSaga from './todolist/saga';

export default function* root() {
  yield all([fork(taskSaga), fork(todolistSaga), fork(listsSaga), fork(tasksSaga)]);
}
