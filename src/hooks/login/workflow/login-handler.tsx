import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import {AuthActions} from '@/contexts/auth';
import {useDispatchAuth} from '@/contexts/auth/context';
import {IState} from '@/contexts/auth/state';
import useToast from '@/lib/core-ui/toast';
import LocalStorage from '@/utils/local-storage';

export default function useLoginHandler() {
  const toast = useToast();
  const router = useRouter();
  const dispatchAuth = useDispatchAuth();

  const loginSuccess = (res: {data: {accessToken: string; user: IState}}) => {
    LocalStorage.accessToken.set(res.data.accessToken);
    dispatchAuth(AuthActions.login(res.data.user));
    const previousPage = LocalStorage.previousPage.get();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    previousPage ? router.push(previousPage) : router.push(ROUTES.HOME);
  };

  const loginFailed = () => {
    toast.show({type: 'danger', title: 'Error', content: 'Can&apos;t create user.'});
  };

  return {loginSuccess, loginFailed};
}
