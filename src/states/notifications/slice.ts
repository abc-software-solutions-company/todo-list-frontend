import {createSlice} from '@reduxjs/toolkit';

import initialState from './initialState';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    getNotificationRequest: state => {
      state.notification.loading = true;
    },
    getNotificationSuccess: (state, {payload}) => {
      state.notification.loading = false;
      state.notification.data = payload;
    },
    getNotificationFailure: (state, {payload}) => {
      state.notification.loading = false;
      state.notification.error = payload;
    },
    setNumberOfUnreadNotification: (state, {payload}) => {
      state.numberOfUnreadNotifications = payload;
    }
  }
});

export default notificationsSlice;
