import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {IUser} from '@/api/network/user';
import QuickPlay from '../quick-play';
import useToast from '@/core-ui/toast';

interface IProps {
  children: ReactNode;
}

const Auth: React.FC<IProps> = ({children}) => {
  const toast = useToast();
  const [user, setUser] = useState<IUser | null>(null);
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;

  useEffect(() => {
    const checkLocal = localStorage.getItem('user');
    const object = checkLocal ? JSON.parse(checkLocal) : null;

    setUser(object);
  }, []);

  if (!user && renderCounter.current == 2) {
    toast.show({type: 'danger', title: '', content: 'You must login!', lifeTime: 3000});
  }

  if (!user) {
    return (
      <>
        <QuickPlay />
      </>
    );
  }

  return <>{children}</>;
};

export default Auth;
