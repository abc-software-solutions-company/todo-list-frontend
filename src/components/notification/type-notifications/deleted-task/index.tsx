import Link from 'next/link';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';

import {TypeNotifications} from '../types';

const DeletedTask: FC<TypeNotifications> = props => {
  const {notification, handleIsRead} = props;
  const {content, link, sender} = notification;

  const textLink = (
    <Link href={`${ROUTES.TASK}/${link}}`} onClick={handleIsRead}>
      {content}
    </Link>
  );

  return (
    <p className="content">
      {sender.name} delete to a task {textLink}
    </p>
  );
};

export default DeletedTask;
