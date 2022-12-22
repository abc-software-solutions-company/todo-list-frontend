import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {ITodolistKanbanResponse} from '@/data/api/types/todolist.type';
import {getErrorMessage} from '@/utils/error-handle';

import todolistKanbanSlice from './slice';
import {IGetTodolistKanbanPayloadAction} from './types';

function* getTodolist({payload}: IGetTodolistKanbanPayloadAction) {
  try {
    const response: AxiosResponse<ITodolistKanbanResponse, any> = yield call(() => api.todolist.getOneKanban(payload));
    yield put(todolistKanbanSlice.actions.getTodolistKanbanSuccess(response.data));
  } catch (error) {
    yield put(todolistKanbanSlice.actions.getTodolistKanbanFailure(getErrorMessage(error)));
  }
}

export default function* kanbanSaga() {
  yield all([takeLatest(todolistKanbanSlice.actions.getTodolistKanbanRequest, getTodolist)]);
}
