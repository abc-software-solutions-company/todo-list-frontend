import {useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';

import style from './style.module.scss';
import TaskComment from './task-comment';

interface ITaskCommentList {
  taskData: ITaskResponse;
  onSuccess?: () => void;
}

export const TaskCommentList = ({taskData, onSuccess}: ITaskCommentList) => {
  const comments = taskData?.comments?.filter(e => e.isActive).reverse();
  const numberStep = 5;
  const [commentsNumber, setCommentsNumber] = useState(numberStep);
  const onClick = () => {
    setCommentsNumber(commentsNumber + numberStep);
  };
  return (
    <div className={style['task-comment-list']}>
      {comments.map((comment, index) => {
        if (index < commentsNumber) return <TaskComment key={comment.id} commentData={comment} onSuccess={onSuccess} />;
      })}
      {commentsNumber < comments.length && (
        <button className="more-comments" onClick={onClick}>
          See more comments
        </button>
      )}
    </div>
  );
};
