import API from '@/api/network/user';
import {ROUTES} from '@/configs/routes.config';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {IUser} from '@/api/network/user';

const useCheckUserLocalStorage = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const checkLocal = localStorage.getItem('user');
    if (!checkLocal) {
      router.push(ROUTES.QUICKPLAY);
    } else {
      const json = localStorage.getItem('user')?.toString();

      if (json) {
        const object = JSON.parse(json);
        API.checkUserLogin(object.id)
          .then(res => {
            if (res.status == 200) {
              setUser(object);
            }
          })
          .catch(() => {
            router.push(ROUTES.QUICKPLAY);
          });
      }
    }
  }, []);

  return {user};
};

export default useCheckUserLocalStorage;
