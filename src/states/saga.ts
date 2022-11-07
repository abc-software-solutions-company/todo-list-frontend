import {all, fork} from 'redux-saga/effects';

import postSagas from './todolist/sagas';

export default function* root() {
  yield all([fork(postSagas)]);
}
