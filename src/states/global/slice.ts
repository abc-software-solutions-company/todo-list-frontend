import {createSlice} from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    anchorElToolBarMenu: null
  },
  reducers: {
    setAnchorElToolBarMenu: (state, action) => {
      const {payload} = action;
      state.anchorElToolBarMenu = payload;
    }
  }
});

export default globalSlice;
