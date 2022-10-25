import {useEffect, useState} from 'react';

import api from '@/data/api/index';
import {ITodolistResponse} from '@/data/api/types/list.type';

export default function useList() {
  const [yourList, setYourList] = useState<ITodolistResponse[]>([]);
  const [favoriteList, setFavoriteList] = useState<ITodolistResponse[]>([]);

  const updateYourList = () => {
    api.list
      .getByUser()
      .then(res => {
        setYourList(res.data);
      })
      .catch(() => {});
  };

  const updateFavoriteList = () => {
    api.list
      .getFavorite()
      .then(res => {
        setFavoriteList(res.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    updateYourList();
    updateFavoriteList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    yourList,
    updateYourList,
    favoriteList,
    updateFavoriteList
  };
}
