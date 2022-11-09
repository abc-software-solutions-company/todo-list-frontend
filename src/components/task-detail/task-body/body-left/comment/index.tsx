import classNames from 'classnames';
import {FC} from 'react';

import Icon from '@/core-ui/icon';

import Title from '../../title';
import {IBodyLeftProps} from '..';
import CommentButton from './comment-button';
import CommentList from './comment-list';

const Comment: FC<IBodyLeftProps> = props => {
  const {className, ...rest} = props;
  return (
    <div className={classNames('comment', className)}>
      <Title icon={<Icon name="ico-message-circle" />} text="Comment" />
      <CommentButton {...rest} />
      <CommentList {...rest} />
    </div>
  );
};
export default Comment;
