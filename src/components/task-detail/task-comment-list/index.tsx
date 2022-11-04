import Link from 'next/link';

import Icon from '@/core-ui/icon';

import {ITaskCommentProp} from '../task-body-left';
import style from './style.module.scss';

interface ITaskCommentList {
  commentList: ITaskCommentProp[];
}

export const TaskCommentList = ({commentList}: ITaskCommentList) => {
  return (
    <div className={style['task-comment-list']}>
      {commentList.map(item => {
        return (
          <>
            {' '}
            <div className="task-comment">
              <div className="user">
                <Icon name="ico-user" />
                <p>{item.userName}</p>
                <div className="time">{item.date}</div>
              </div>
              <div className="content">
                <p>{item.content}</p>
              </div>
              <div className="action">
                <Link href={'#'}>Edit</Link>
                <Link href={'#'}>Delete</Link>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
