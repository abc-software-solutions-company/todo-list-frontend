import classNames from 'classnames';
import {FC, useState} from 'react';

import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

import Item from './item';
import style from './style.module.scss';

const CommentList: FC<IBaseProps> = ({className}) => {
  const {task} = useTask();
  const numberStep = 5;
  const [commentsNumber, setCommentsNumber] = useState(numberStep);

  const comments = task?.comments?.filter(e => e.isActive).reverse();

  const onClick = () => {
    setCommentsNumber(commentsNumber + numberStep);
  };

  return (
    <div className={classNames(style['task-comment-list'], className)}>
      {comments.map((comment, index) => {
        if (index < commentsNumber) return <Item key={index} comment={comment} />;
      })}
      {commentsNumber < comments.length && (
        <button className="more-comments" onClick={onClick}>
          See more comments
        </button>
      )}
    </div>
  );
};

export default CommentList;
