import {all, fork} from 'redux-saga/effects';

import taskSaga from './task/saga';
import todolistSaga from './todolist/saga';

export default function* root() {
  yield all([fork(taskSaga), fork(todolistSaga)]);
}
