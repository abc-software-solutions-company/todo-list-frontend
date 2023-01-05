import Link from 'next/link';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';

import {TypeNotifications} from '../types';

const UnassignedMyself: FC<TypeNotifications> = props => {
  const {notification, handleIsRead} = props;
  const {content, link, sender} = notification;

  const textLink = (
    <Link href={`${ROUTES.TASK}/${link}`} onClick={handleIsRead}>
      {content}
    </Link>
  );

  return (
    <p className="content">
      {sender.name} unassigned a task {textLink} to {sender.name}
    </p>
  );
};

export default UnassignedMyself;
