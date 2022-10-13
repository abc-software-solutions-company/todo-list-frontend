import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import globalSlice from './global/slice';
import taskSaga from './saga';
import taskSlice from './task/slice';

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    post: taskSlice.reducer
  },
  middleware: [sagaMiddleWare]
});

sagaMiddleWare.run(taskSaga);

export {store};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
