import {useEffect, useState} from 'react';

export default function useAuth() {
  const [user, setUser] = useState({userName: ''});
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    const userObject = JSON.parse(userJson || '{}');
    setUser(userObject);
  }, []);

  return user;
}
