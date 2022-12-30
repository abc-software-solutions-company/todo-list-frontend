import {INotificationResponse} from '@/data/api/types/notification.type';

export enum Type {
  ASSIGNED = 'assigned',
  ASSIGNED_MYSELF = 'assigned-myself',
  DELETED_TASK = 'deleted-task',
  INVITED = 'invited',
  PRIORITY = 'priority',
  UNASSIGNED = 'unassigned',
  UNASSIGNED_MYSELF = 'unassigned-myself',
  STATUS = 'status'
}

export interface TypeNotifications {
  notification: INotificationResponse;
  handleIsRead?: () => void;
}
