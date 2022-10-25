import {FC} from 'react';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/list.type';
import {useStateAuth} from '@/states/auth';

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

  return (
    <Button
      className={className}
      startIcon={isFavorited ? <Icon name="ico-star-filled" className="text-yellow-400" /> : <Icon name="ico-star" className="text-yellow-400" />}
      onClick={onFavorite}
    />
  );
};

export default FavoriteButton;
