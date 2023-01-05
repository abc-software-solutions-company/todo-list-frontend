import {INotificationResponse} from '@/data/api/types/notification.type';

import {IInitialState} from './types';

const initialState: IInitialState = {
  notification: {
    loading: false,
    data: [] as INotificationResponse[],
    error: null
  },
  numberOfUnreadNotifications: 0
};

export default initialState;
