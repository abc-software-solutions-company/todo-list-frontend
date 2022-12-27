import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import boardSlice from './board/slice';
import filterSlice from './filter/slice';
import globalSlice from './global/slice';
import listsSlice from './lists/slice';
import modalsSlice from './modals/slice';
import saga from './saga';
import taskSlice from './task/slice';
import tasksSlice from './tasks/slice';
import todolistSlice from './todolist/slice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  middleware: [sagaMiddleware],
  reducer: {
    global: globalSlice.reducer,
    task: taskSlice.reducer,
    todolist: todolistSlice.reducer,
    lists: listsSlice.reducer,
    tasks: tasksSlice.reducer,
    modals: modalsSlice.reducer,
    filter: filterSlice.reducer,
    board: boardSlice.reducer
  }
});

sagaMiddleware.run(saga);

export {boardSlice, globalSlice, store, taskSlice, todolistSlice};
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {post: postState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
