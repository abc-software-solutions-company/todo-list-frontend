import Link from 'next/link';

import Icon from '@/core-ui/icon';

import style from './style.module.scss';

interface ITaskCommentProp {
  userName: string;
  date: string;
  content: string;
}

const taskCommentList: ITaskCommentProp[] = [
  {
    userName: 'gjlasgnlasjk',
    date: 'gfknglank',
    content: '21/1/2000'
  },
  {userName: 'Huy', content: 'Task Comment 2', date: '21/1/2000'}
];

export const TaskCommentList = () => {
  {
    console.log(taskCommentList);
  }
  return (
    <div className={style['task-comment-list']}>
      {taskCommentList.map(item => {
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
