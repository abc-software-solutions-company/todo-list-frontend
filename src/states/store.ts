import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import globalSlice from './global/slice';
import saga from './saga';
import taskSlice from './task/slice';
import todolistSlice from './todolist/slice';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  middleware: [sagaMiddleware],
  reducer: {
    global: globalSlice.reducer,
    task: taskSlice.reducer,
    todolist: todolistSlice.reducer
  }
});

sagaMiddleware.run(saga);

export {globalSlice, store, taskSlice, todolistSlice};
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {post: postState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
