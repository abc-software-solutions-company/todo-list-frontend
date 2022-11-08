import {FC, useState} from 'react';

import {IBodyLeftProps} from '../..';
import Item from './item';
import style from './style.module.scss';

const List: FC<IBodyLeftProps> = ({taskData, onSuccess}) => {
  const comments = taskData?.comments?.filter(e => e.isActive).reverse();
  const numberStep = 5;
  const [commentsNumber, setCommentsNumber] = useState(numberStep);
  const onClick = () => {
    setCommentsNumber(commentsNumber + numberStep);
  };

  return (
    <div className={style['task-comment-list']}>
      {comments.map((comment, index) => {
        if (index < commentsNumber) return <Item key={comment.id} {...{commentData: comment, onSuccess}} />;
      })}
      {commentsNumber < comments.length && (
        <button className="more-comments" onClick={onClick}>
          See more comments
        </button>
      )}
    </div>
  );
};
export default List;
