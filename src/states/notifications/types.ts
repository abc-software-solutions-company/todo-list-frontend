import {INotificationResponse} from '@/data/api/types/notification.type';

export interface IInitialState {
  notification: {
    loading: boolean;
    data: INotificationResponse[];
    error: any;
  };
}
