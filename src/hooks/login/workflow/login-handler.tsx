import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import {AuthActions} from '@/states/auth';
import {useDispatchAuth} from '@/states/auth/context';
import {IState} from '@/states/auth/state';
import LocalStorage from '@/utils/local-storage';

export default function useLoginHandler() {
  // Initial toast, router and auth disaptch
  const toast = useToast();
  const router = useRouter();
  const dispatchAuth = useDispatchAuth();

  // Save token and redirect to specific page when login success
  const loginSuccess = (res: {data: {accessToken: string; user: IState}}) => {
    LocalStorage.accessToken.set(res.data.accessToken);
    dispatchAuth(AuthActions.login(res.data.user));
    const previousPage = LocalStorage.previousPage.get();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    previousPage ? router.push(previousPage) : router.push(ROUTES.HOME);
  };

  // Show Error when Login Failed
  const loginFailed = () => toast.show({type: 'danger', title: 'Error', content: 'Can&apos;t create user.'});

  return {loginSuccess, loginFailed};
}
