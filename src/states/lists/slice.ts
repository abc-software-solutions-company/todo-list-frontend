import {createSlice} from '@reduxjs/toolkit';

import initialState from './initialState';

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    getMyListRequest: state => {
      state.myList.loading = true;
    },
    getMyListSuccess: (state, {payload}) => {
      state.myList.loading = false;
      state.myList.data = payload;
    },
    getMyListFailure: (state, {payload}) => {
      state.myList.loading = false;
      state.myList.error = payload;
    },
    getFavoriteListRequest: state => {
      state.favoriteList.loading = true;
    },
    getFavoriteListSuccess: (state, {payload}) => {
      state.favoriteList.loading = false;
      state.favoriteList.data = payload;
    },
    getFavoriteListFailure: (state, {payload}) => {
      state.favoriteList.loading = false;
      state.favoriteList.error = payload;
    }
  }
});

export default listsSlice;
