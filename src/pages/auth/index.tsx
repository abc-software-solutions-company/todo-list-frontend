import React, {ReactNode, useEffect, useState} from 'react';
import {IUser} from '@/api/network/user';
import QuickPlay from '../quick-play';

interface IProps {
  children: ReactNode;
}

const Auth: React.FC<IProps> = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const checkLocal = localStorage.getItem('user');
    const object = checkLocal ? JSON.parse(checkLocal) : null;

    setUser(object);
  }, []);

  console.log(user);

  if (!user)
    return (
      <>
        <QuickPlay />
      </>
    );

  return <>{children}</>;
};

export default Auth;
