import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'global',
  initialState: {
    isOpenMainMenu: false,
    isOpenVideoModal: false
  },
  reducers: {
    setOpenMainMenu: (state, action) => {
      state.isOpenMainMenu = action.payload.a;
    },
    setOpenVideoModal: (state, action) => {
      state.isOpenVideoModal = action.payload.a;
    }
  }
});

export default slice;
