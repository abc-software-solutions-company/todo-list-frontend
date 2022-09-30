import {useRouter} from 'next/router';
import React, {FC, ReactNode, useEffect, useReducer} from 'react';

import api from '@/api/network/user';
import {ROUTES} from '@/configs/routes.config';
import LocalStorage from '@/utils/local-storage';

import {Context, DispatchContext, useDispatchAuth, useStateAuth} from './context';
import reducer from './reducer';
import initialState from './state';

import {AuthActions} from '.';

interface IProps {
  children: ReactNode;
}

const Authentication: FC<IProps> = ({children}) => {
  const auth = useStateAuth();
  const router = useRouter();
  const asPath = router.asPath;
  const authDispatch = useDispatchAuth();
  if (!asPath.includes(ROUTES.LOGIN)) {
    if (typeof window !== 'undefined') {
      //FIXME: This is temporary method to fix id not recognize in production mode
      if (asPath.includes(`${ROUTES.LIST}/[id]`)) LocalStorage.previousPage.set(window.location.href.slice(-10));
      else {
        LocalStorage.previousPage.set(asPath);
      }
    }
  }

  useEffect(() => {
    const accessToken = LocalStorage.accessToken.get();
    console.log('🚀 ~ file: provider.tsx ~ line 35 ~ useEffect ~ accessToken', accessToken);

    if (accessToken && !auth) {
      api.getUserProfile().then(res => {
        if (res.status === 200) authDispatch(AuthActions.login(res.data));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

const AuthProvider: FC<IProps> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <Context.Provider value={state}>
        <Authentication>{children}</Authentication>
      </Context.Provider>
    </DispatchContext.Provider>
  );
};

export default AuthProvider;
