import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import globalSlice from './global/slice';
import kanbanSlice from './kanban/slice';
import listsSlice from './lists/slice';
import saga from './saga';
import taskSlice from './task/slice';
import todolistSlice from './todolist/slice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  middleware: [sagaMiddleware],
  reducer: {
    global: globalSlice.reducer,
    task: taskSlice.reducer,
    todolist: todolistSlice.reducer,
    lists: listsSlice.reducer,
    kanban: kanbanSlice.reducer
  }
});

sagaMiddleware.run(saga);

export {globalSlice, kanbanSlice, store, taskSlice, todolistSlice};
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {post: postState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
