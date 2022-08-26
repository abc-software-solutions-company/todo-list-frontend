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
        setUser(object);
      }
    }
  }, []);

  return {user};
};

export default useCheckUserLocalStorage;
