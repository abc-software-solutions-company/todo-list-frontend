import {configureStore} from '@reduxjs/toolkit';

import globalSlice from './global/slice';

const store = configureStore({
  reducer: {
    global: globalSlice.reducer
  }
});
export {globalSlice, store};
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {post: postState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
