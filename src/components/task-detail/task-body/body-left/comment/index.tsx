import classNames from 'classnames';
import {FC} from 'react';

import Icon from '@/core-ui/icon';

import Title from '../../title';
import {IBodyLeftProps} from '..';
import Form from './form';
import List from './list';

const Comment: FC<IBodyLeftProps> = props => {
  const {className, ...rest} = props;
  return (
    <div className={classNames('comment', className)}>
      <Title icon={<Icon name="ico-message-circle" />} text="Comment" />
      <Form {...rest} />
      <List {...rest} />
    </div>
  );
};
export default Comment;
