import {useRouter} from 'next/router';
import React, {FC, ReactNode, useEffect, useReducer} from 'react';

import {ROUTES} from '@/configs/routes.config';
import api from '@/data/api/index';
import useLoginHandler from '@/hooks/login/workflow/login-handler';
import LocalStorage from '@/utils/local-storage';

import {AuthActions} from '.';
import {Context, DispatchContext, useDispatchAuth, useStateAuth} from './context';
import reducer from './reducer';
import initialState from './state';

interface IProps {
  children: ReactNode;
}

const Authentication: FC<IProps> = ({children}) => {
  const auth = useStateAuth();
  const router = useRouter();
  const asPath = router.asPath;
  const isLoginPage = asPath.includes(ROUTES.LOGIN);
  const authDispatch = useDispatchAuth();
  const {loginSuccess} = useLoginHandler();

  let showPage = false;
  useEffect(() => {
    if (!asPath.includes(ROUTES.LOGIN)) {
      if (typeof window !== 'undefined') {
        //FIXME: This is temporary method to fix id not recognize in production mode
        if (asPath.includes(`${ROUTES.LIST}/[id]`)) LocalStorage.previousPage.set(window.location.href.slice(-10));
        else LocalStorage.previousPage.set(asPath);
      }
    }
    if (!auth && !isLoginPage) {
      api.auth
        .verify()
        .then(res => {
          if (res.status === 200) {
            // const {name, email,id} = res.data;
            authDispatch(AuthActions.login({user: res.data}));
          }
        })
        .catch(() => {
          if (asPath.includes(`${ROUTES.LIST}`))
            api.auth.login({name: 'Anonymous'}).then(res => {
              loginSuccess({accessToken: res.data.accessToken, user: res.data.user});
            });
          else {
            router.push(ROUTES.LOGIN);
          }
          // }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoginPage || auth) showPage = true;
  return (
    <div style={{height: 'inherit'}} className={showPage ? '' : 'invisible'}>
      {children}
    </div>
  );
};

const Provider: FC<IProps> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <Context.Provider value={state}>
        <Authentication>{children}</Authentication>
      </Context.Provider>
    </DispatchContext.Provider>
  );
};

export default Provider;
