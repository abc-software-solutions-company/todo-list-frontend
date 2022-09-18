import React, {FC, ReactNode, useEffect, useReducer, useState} from 'react';

import {IUser} from '@/api/types/user.type';

import {Context, DispatchContext} from './context';
import reducer from './reducer';
import initialState from './state';

interface IProps {
  children: ReactNode;
}

const AuthProvider: FC<IProps> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const userData = JSON.parse(userJson) as IUser;
      setUser(userData);
    }
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <Context.Provider value={{...state, user}}>{children}</Context.Provider>
    </DispatchContext.Provider>
  );
};

export default AuthProvider;
