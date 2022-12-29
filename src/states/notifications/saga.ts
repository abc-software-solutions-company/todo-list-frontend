import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {INotificationResponse} from '@/data/api/types/notification.type';
import {getErrorMessage} from '@/utils/error-handle';

import notificationsSlice from './slice';

function* getNotification() {
  try {
    const response: AxiosResponse<INotificationResponse[], any> = yield call(() => api.notification.get());
    yield put(notificationsSlice.actions.getNotificationSuccess(response.data));
  } catch (error) {
    yield put(notificationsSlice.actions.getNotificationFailure(getErrorMessage(error)));
  }
}

export default function* notificationsSaga() {
  yield all([takeLatest(notificationsSlice.actions.getNotificationRequest, getNotification)]);
}
