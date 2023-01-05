import cls from 'classnames';
import {FC, useState} from 'react';

import AssigneeIcon from '@/components/common/assignee-icon';
import Icon from '@/core-ui/icon';
import api from '@/data/api';
import useNotifications from '@/states/notifications/use-notifications';
import {formatForNotification} from '@/utils/date-format/notification';

import TypeNotifcations from '../type-notifications';
import styles from './style.module.scss';

interface IProps {
  handleClose?: () => void;
}

const Contents: FC<IProps> = props => {
  const {handleClose} = props;

  const {notifications} = useNotifications();
  const [count, setCount] = useState(1);

  const numberShow = 4;
  const notificationShowed = notifications.slice(0, numberShow * count);

  const handleCount = () => {
    setCount(count + 1);
  };

  const handleIsRead = (id: string) => {
    api.notification.update(id);
  };

  return (
    <>
      {notifications && (
        <div className={cls(styles.contents)}>
          <div className="header">
            <p className="title">Notification</p>
            <Icon className="ico" name="ico-x" size={24} onClick={handleClose} />
          </div>
          <hr />
          <div className="body">
            {notifications.length == 0 ? (
              <div className="empty">You don&apos;t have any notifications</div>
            ) : (
              notificationShowed.map(item => {
                const result = formatForNotification(item?.createdDate);
                return (
                  <>
                    <div className="item" key={item?.link} onClick={() => handleIsRead(item?.id)}>
                      <div className="icon-name">
                        <AssigneeIcon name={item?.sender.name} bg="bg-sky-500" />
                      </div>
                      <div>
                        <TypeNotifcations notification={item} />
                        <p className="time">{result}</p>
                      </div>
                      {!item?.isRead && <span className="dot"></span>}
                    </div>
                  </>
                );
              })
            )}
          </div>
          <div className="footer">
            {notifications.length > 4 && notificationShowed.length < notifications.length && (
              <p className="load-more" onClick={handleCount}>
                Load more
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Contents;
