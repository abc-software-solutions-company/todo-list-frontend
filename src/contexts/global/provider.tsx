import {useRouter} from 'next/router';
import React, {FC, ReactNode, useEffect, useReducer} from 'react';

import api from '@/api/network/user';
import {ROUTES} from '@/configs/routes.config';
import LocalStorage from '@/utils/local-storage';

import {AuthActions, useStateAuth} from '../auth';
import {useDispatchAuth} from '../auth/context';
import {Context, DispatchContext} from './context';
import reducer from './reducer';
import initialState from './state';

interface IProps {
  children: ReactNode;
}

const Authentication: FC<IProps> = ({children}) => {
  const auth = useStateAuth();

  const router = useRouter();
  const asPath = router.asPath;
  const authDispatch = useDispatchAuth();

  useEffect(() => {
    if (!asPath.includes(ROUTES.LOGIN)) {
      LocalStorage.previousPage.set(asPath);
    }
    const accessToken = LocalStorage.accessToken.get();
    if (!accessToken) {
      if (!asPath.includes(ROUTES.LOGIN)) router.push(ROUTES.LOGIN);
    } else {
      if (!auth) {
        api.getUserProfile().then(res => {
          if (res.status === 200) authDispatch(AuthActions.login(res.data));
          else if (!asPath.includes(ROUTES.LOGIN)) router.push(ROUTES.LOGIN);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('🚀 ~ file: provider.tsx ~ line 20 ~ auth', auth);

  if (!asPath.includes(ROUTES.LOGIN) && !auth) return null;

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
