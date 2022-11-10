import classNames from 'classnames';
import {FC} from 'react';

import IconButton from '@/core-ui/icon-button';
import useToast from '@/core-ui/toast';
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
  const toast = useToast();
  const auth = useStateAuth();
  const isFavorited = todolist.favorites.filter(e => e.isActive && e.userId === auth?.id).length === 1;

  const onFavorite = () => {
    let req: Promise<any>;
    if (isFavorited) {
      req = api.favorite.update({todolistId: todolist.id, isActive: false});
    } else req = api.favorite.create({todolistId: todolist.id});
    req
      .then(() => toast.show({type: 'success', title: 'Favorite', content: 'success'}))
      .then(onSuccess)
      .catch(() => toast.show({type: 'warning', title: 'Favorite', content: 'An error occurred, please try again'}));
  };
  const iconName = isFavorited ? 'ico-star-filled' : 'ico-star';

  return <IconButton className={classNames(style.icon, className)} name={iconName} onClick={onFavorite} />;
};

export default FavoriteButton;
