import cls from 'classnames';
import {FC, useState} from 'react';

import AssigneeIcon from '@/components/common/assignee-icon';
import api from '@/data/api';
import useNotifications from '@/states/notifications/use-notifications';
import {formatForNotification} from '@/utils/date-format/notification';

import styles from './style.module.scss';

const Contents: FC = () => {
  const {notifications} = useNotifications();
  const [count, setCount] = useState(4);

  const handleCount = () => {
    setCount(-1);
  };

  const handleIsRead = (id: string) => {
    api.notification.update(id);
  };

  return (
    <>
      {notifications && (
        <div className={cls(styles.contents)}>
          <div className="wrapper">
            <div className="header">
              <p className="title">Notification</p>
            </div>
            <hr />
            <div className="body">
              {notifications.length == 0 ? (
                <div className="empty">empty</div>
              ) : (
                notifications.slice(0, count).map(item => {
                  const result = formatForNotification(item?.createdDate);
                  return (
                    <>
                      <div className="item" key={item?.link} onClick={() => handleIsRead(item.id)}>
                        <div className="icon-name">
                          <AssigneeIcon name={item?.sender.name} bg="bg-sky-500" />
                        </div>
                        <div>
                          <div className="content" dangerouslySetInnerHTML={{__html: item?.content}}></div>
                          <p className="time">{result}</p>
                        </div>
                        {!item?.isRead && <span className="dot"></span>}
                      </div>
                    </>
                  );
                })
              )}
              {notifications.length > 4 && (
                <p className="load-more" onClick={handleCount}>
                  Load more Notification
                </p>
              )}
            </div>
            <hr />
          </div>
        </div>
      )}
    </>
  );
};

export default Contents;
