import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import {IAuthResponse} from '@/data/api/types/auth.type';
import {AuthActions} from '@/states/auth';
import {useDispatchAuth} from '@/states/auth/context';
import LocalStorage from '@/utils/local-storage';

export default function useLoginHandler() {
  // Initial toast, router and auth disaptch
  const toast = useToast();
  const router = useRouter();
  const dispatchAuth = useDispatchAuth();

  // Save token and redirect to specific page when login success
  const loginSuccess = (data: IAuthResponse) => {
    LocalStorage.accessToken.set(data.accessToken);
    const {user} = data;
    dispatchAuth(AuthActions.login(user));
    const previousPage = LocalStorage.previousPage.get();
    if (previousPage) router.push(previousPage);
    else router.push(ROUTES.HOME);
  };

  // Show Error when Login Failed
  const loginFailed = () => toast.show({type: 'danger', title: 'Error', content: 'Can&apos;t create user.'});

  return {loginSuccess, loginFailed};
}
