import Link from 'next/link';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import {ITaskResponse} from '@/data/api/types/task.type';
import {Priorities, PriorityColors} from '@/utils/constant';

import {TypeNotifications} from '../types';

const Priority: FC<TypeNotifications> = props => {
  const {notification, handleIsRead} = props;
  const {content, link, before, after, sender} = notification;

  const taskBefore: ITaskResponse = JSON.parse(before);
  const taskAfter: ITaskResponse = JSON.parse(after);

  const list = Object.values(Priorities).reverse();
  const colors = Object.values(PriorityColors).reverse();

  const indexBefore = list.indexOf(taskBefore.priority);
  const indexAfter = list.indexOf(taskAfter.priority);
  const colorBefore = colors[indexBefore];
  const colorAfter = colors[indexAfter];

  const textLink = (
    <Link href={`${ROUTES.TASK}/${link}`} onClick={handleIsRead}>
      {content}
    </Link>
  );

  return (
    <p className="content">
      <span className="sender-name">{sender.name}</span> changed a task {textLink} from{' '}
      <span style={{color: colorBefore}}>{taskBefore.priority}</span> to{' '}
      <span style={{color: colorAfter}}>{taskAfter.priority}</span>
    </p>
  );
};

export default Priority;

// "Hoa Pham" changed a task "abc" from "Medium" to "High"
