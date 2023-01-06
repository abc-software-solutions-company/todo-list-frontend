import {INotificationResponse} from '@/data/api/types/notification.type';

export enum Type {
  ASSIGNED = 'assigned',
  ASSIGNED_MYSELF = 'assigned-myself',
  DELETED_TASK = 'deleted-task',
  INVITED = 'invited',
  PRIORITY = 'priority',
  RENAME_TASK = 'rename-task',
  STATUS = 'status',
  UNASSIGNED = 'unassigned',
  UNASSIGNED_MYSELF = 'unassigned-myself'
}

export interface TypeNotifications {
  notification: INotificationResponse;
  handleIsRead?: () => void;
}
