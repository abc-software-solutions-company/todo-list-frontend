import {Badge, Popover} from '@mui/material';
import {FC, useEffect, useState} from 'react';

import Icon from '@/core-ui/icon';
import socket from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import {useStateAuth} from '@/states/auth';
import useNotifications from '@/states/notifications/use-notifications';

import Contents from './contents';

const Notification: FC = () => {
  const auth = useStateAuth();
  const {notifications, getNotifications} = useNotifications();
  const {numberOfUnreadNotifications, setNumberOfUnreadNotification} = useNotifications();

  const unread = notifications.filter(item => {
    if (item.isRead == false) return item;
  });

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNumberOfUnreadNotification(0);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setNumberOfUnreadNotification(unread.length);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth};
      socket.connect();
      getNotifications();
    }

    socket.on(SOCKET_EVENTS.reconnect, attempt => {
      console.log('SocketIO', SOCKET_EVENTS.reconnect, attempt);
      getNotifications();
    });

    socket.on(SOCKET_EVENTS.updateNotification, () => {
      console.log('SocketIO', SOCKET_EVENTS.updateNotification);
      getNotifications();
    });

    return () => {
      socket.off(SOCKET_EVENTS.reconnect);
      socket.off(SOCKET_EVENTS.updateNotification);
    };
  }, [auth]);

  useEffect(() => {
    if (!anchorEl) {
      setNumberOfUnreadNotification(unread.length);
    }
  }, [unread.length]);

  return (
    <>
      <Badge
        badgeContent={numberOfUnreadNotifications}
        color="error"
        className="cursor-pointer"
        onClick={handleClick}
        sx={{
          '& .MuiBadge-badge': {
            top: 5,
            right: 2
          }
        }}
      >
        <Icon name="ico-bell" />
      </Badge>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{marginBottom: 4}}
        PaperProps={{
          elevation: 1,
          sx: {
            scrollbarWidth: 'thin',
            paddingY: 2
          }
        }}
      >
        <Contents handleClose={handleClose} />
      </Popover>
    </>
  );
};

export default Notification;
