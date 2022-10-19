import {useEffect, useState} from 'react';

import api from '@/data/api/index';
import {IListResponse} from '@/data/api/types/list.type';

export default function useList() {
  const [allListbyUser, setAllListbyUser] = useState<IListResponse[]>([]);

  const updateAllListbyUser = () => {
    api.list
      .getByUser()
      .then(res => {
        setAllListbyUser(res.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    updateAllListbyUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    allListbyUser,
    updateAllListbyUser
  };
}
