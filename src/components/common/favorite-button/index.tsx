import classNames from 'classnames';
import {FC} from 'react';

import IconButton from '@/core-ui/icon-button';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {useStateAuth} from '@/states/auth';

import style from './style.module.scss';

interface IProps {
  className?: string;
  todolist: ITodolistResponse;
  onSuccess: () => void;
}
const FavoriteButton: FC<IProps> = ({className, todolist, onSuccess}) => {
  const auth = useStateAuth();
  const {id, favorites} = todolist;
  const isFavorited = favorites.filter(e => e.userId === auth?.id).length === 1;

  const onClick = () => api.todolist.update({id, favorite: !isFavorited}).then(onSuccess);
  const iconName = isFavorited ? 'ico-star-filled' : 'ico-star';

  return <IconButton className={classNames(style.icon, className)} name={iconName} onClick={onClick} />;
};

export default FavoriteButton;
