import {all, fork} from 'redux-saga/effects';

import taskSaga from './task/saga';

export default function* root() {
  yield all([fork(taskSaga)]);
}
