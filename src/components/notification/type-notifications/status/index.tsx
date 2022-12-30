import Link from 'next/link';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import {IStatus} from '@/data/api/types/todolist.type';

import {TypeNotifications} from '../types';

const Status: FC<TypeNotifications> = props => {
  const {notification, handleIsRead} = props;
  const {content, link, before, after, sender} = notification;

  const statusBefore: IStatus = JSON.parse(before);
  const statusAfter: IStatus = JSON.parse(after);

  const textLink = (
    <Link href={`${ROUTES.TASK}/${link}}`} onClick={handleIsRead}>
      {content}
    </Link>
  );

  return (
    <p className="content">
      {sender.name} changed a task {textLink} from <span style={{color: statusBefore.color}}>{statusBefore.name}</span>{' '}
      to <span style={{color: statusAfter.color}}>{statusAfter.name}</span>
    </p>
  );
};

export default Status;
