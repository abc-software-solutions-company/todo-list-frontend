import Link from 'next/link';
import {FC} from 'react';

import Icon from '@/core-ui/icon';

import style from './style.module.scss';

export const TaskCommentList: FC = () => {
  return (
    <div className={style['task-comment-list']}>
      <div className="user">
        <Icon name="ico-user" />
        <p>Thien</p>
        <div className="time">24 minutes ago(fixed)</div>
      </div>
      <div className="content">
        <p>Hello where old are you?</p>
      </div>
      <div className="action">
        <Link href={'#'}>Edit</Link>
        <Link href={'#'}>Delete</Link>
      </div>
    </div>
  );
};
