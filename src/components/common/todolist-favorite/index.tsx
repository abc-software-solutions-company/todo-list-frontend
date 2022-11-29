import classNames from 'classnames';
import {FC, useState} from 'react';

import IconButton from '@/core-ui/icon-button';
import api from '@/data/api';

import style from './style.module.scss';

interface IProps {
  className?: string;
  id?: string;
  favorite?: boolean;
  onSuccess?: () => void;
}
const TodolistFavorite: FC<IProps> = ({className, id, favorite = false, onSuccess}) => {
  const [favoriteState, setFavoriteState] = useState(favorite);

  const iconName = favoriteState ? 'ico-star-filled' : 'ico-star';

  const onClick = () => {
    if (id)
      api.todolist
        .update({id, favorite: !favoriteState})
        .then(() => setFavoriteState(!favoriteState))
        .then(onSuccess);
  };

  return <IconButton className={classNames(style.icon, className)} name={iconName} onClick={onClick} />;
};

export default TodolistFavorite;
