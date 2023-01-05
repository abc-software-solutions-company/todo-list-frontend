import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../store';
import notificationsSlice from './slice';

export default function useNotifications() {
  const state = useSelector((root: RootState) => root.notifications);
  const {notification, ...rest} = state;
  const notifications = notification.data;

  const dispatch = useDispatch();
  const {actions} = notificationsSlice;

  const getNotifications = () => dispatch(actions.getNotificationRequest());
  const setNumberOfUnreadNotification = (number: number) => dispatch(actions.setNumberOfUnreadNotification(number));

  return {...rest, notifications, getNotifications, setNumberOfUnreadNotification};
}
