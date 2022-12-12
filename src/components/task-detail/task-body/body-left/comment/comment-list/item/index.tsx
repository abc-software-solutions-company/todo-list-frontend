import {FC, useState} from 'react';

import Icon from '@/core-ui/icon';
import {ICommentResponse} from '@/data/api/types/task.type';
import {useStateAuth} from '@/states/auth';

import Actions from './actions';
import Content from './content';
import Header from './header';

export interface IItemProps {
  comment: ICommentResponse;
}

const Item: FC<IItemProps> = props => {
  const {comment} = props;
  const {user} = comment;

  const auth = useStateAuth();

  const [isEditing, setIsEditing] = useState(false);

  const onEdit = () => setIsEditing(true);
  const onClose = () => setIsEditing(false);

  const showActions = !isEditing && auth?.id === user.id && auth?.id !== undefined;

  return (
    <div className="task-comment">
      <div className="left">
        <Icon name="ico-user" />
      </div>
      <div className="right">
        <Header {...props} />
        <Content {...{...props, isEditing, onClose}} />
        <Actions {...{...props, onEdit, show: showActions}} />
      </div>
    </div>
  );
};
export default Item;
