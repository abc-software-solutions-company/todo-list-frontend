import Link from 'next/link';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';

import {TypeNotifications} from '../types';

const Invited: FC<TypeNotifications> = props => {
  const {notification, handleIsRead} = props;
  const {content, link, sender} = notification;

  const textLink = (
    <Link href={`${ROUTES.LIST}/${link}}`} onClick={handleIsRead}>
      {content}
    </Link>
  );
  return (
    <p className="content">
      {sender.name} invited you in a list task {textLink}
    </p>
  );
};

export default Invited;
