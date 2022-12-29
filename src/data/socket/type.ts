import {IToastItem} from '@/core-ui/toast/toast';

export const SOCKET_EVENTS = {
  reconnect: 'reconnect',
  updateList: 'updateList',
  updateListExceptMe: 'updateListExceptMe',
  updateNotification: 'updateNotification'
};

export interface IsocketToast extends IToastItem {
  lifeTime?: number;
}
