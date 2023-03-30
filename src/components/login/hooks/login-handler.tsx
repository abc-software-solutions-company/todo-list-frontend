import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import {IAuthResponse} from '@/data/api/types/auth.type';
import {AuthActions} from '@/states/auth';
import {useDispatchAuth} from '@/states/auth/context';
import LocalStorage from '@/utils/local-storage';

export default function useLoginHandler() {
  const toast = useToast();
  const {asPath: currentPath, push: routerPush, reload: routerReload} = useRouter();
  const dispatchAuth = useDispatchAuth();

  const loginSuccess = ({accessToken, user}: IAuthResponse) => {
    LocalStorage.accessToken.set(accessToken);
    dispatchAuth(AuthActions.login(user));
    if (currentPath == ROUTES.LOGIN) routerPush(LocalStorage.previousPage.get() || ROUTES.HOME);
    else routerReload();
  };

  const loginFailed = () => toast.show({type: 'danger', title: 'Error', content: 'Can&apos;t create user.'});

  return {loginSuccess, loginFailed};
}
