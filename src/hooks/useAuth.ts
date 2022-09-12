import {useEffect, useState} from 'react';

import API from '@/api/network/user';

export default function useAuth() {
  const [user, setUser] = useState({userName: ''});
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    const userObject = JSON.parse(userJson || '{}');
    console.log(userObject.id);

    API.checkUserLogin(userObject.id)
      .then(() => {
        setUser(userObject);
      })
      .catch(() => {
        localStorage.removeItem('user');
      });
  }, []);

  return user;
}
