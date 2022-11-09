import {FC, useState} from 'react';

import Icon from '@/core-ui/icon';
import {ICommentResponse} from '@/data/api/types/task.type';
import {useStateAuth} from '@/states/auth';

import Actions from './actions';
import Content from './content';
import Header from './header';

export interface IItemProps {
  commentData: ICommentResponse;
  onSuccess?: () => void;
}

const Item: FC<IItemProps> = props => {
  const {commentData, onSuccess} = props;
  const {user} = commentData;

  const auth = useStateAuth();

  const [isEditting, setIsEditting] = useState(false);

  const onEdit = () => setIsEditting(true);
  const onClose = () => setIsEditting(false);

  const showActions = !isEditting && auth?.id === user.id;
  const showContent = !showActions;

  return (
    <div className="task-comment">
      <div className="left">
        <Icon name="ico-user" />
      </div>
      <div className="right">
        <Header {...props} />
        <Content {...{...props, show: showContent, onClose}} />
        <Actions {...{commentData, onSuccess, onEdit, show: showActions}} />
      </div>
    </div>
  );
};
export default Item;
