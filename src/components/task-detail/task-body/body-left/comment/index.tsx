import classNames from 'classnames';
import {FC} from 'react';

import Icon from '@/core-ui/icon';
import {IBaseProps} from '@/types';

import Title from '../../title';
import CommentButton from './comment-button';
import CommentList from './comment-list';

const Comment: FC<IBaseProps> = ({className}) => {
  return (
    <div className={classNames('comment', className)}>
      <Title icon={<Icon name="ico-message-circle" />} text="Comment" />
      <CommentButton />
      <CommentList />
    </div>
  );
};
export default Comment;
