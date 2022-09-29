import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';
import {useRouter} from 'next/router';

import API from '@/api/network/user';
import {IEmail} from '@/api/types/email.type';
import {ROUTES} from '@/configs/routes.config';
import {AuthActions} from '@/contexts/auth';
import {useDispatchAuth} from '@/contexts/auth/context';
import useToast from '@/core-ui/toast';
import LocalStorage from '@/utils/local-storage';

const auth = getAuth();

export default function useLoginGoogle() {
  const router = useRouter();
  const toast = useToast();
  const googleProvider = new GoogleAuthProvider();
  const dispatchAuth = useDispatchAuth();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };

  const signOutOfGoogle = () => {
    signOut(auth);
  };

  const attachEmailToUser = async (email: IEmail) => {
    await API.attachEmail(email)
      .then(() => {
        toast.show({
          type: 'success',
          title: 'Successful',
          content: 'Your Gmail is binded to this guest account',
          lifeTime: 3000
        });
        // eslint-disable-next-line no-self-assign
        router.reload();
      })
      .catch(async () => {
        await signOutOfGoogle();
        toast.show({
          type: 'danger',
          title: 'Error!',
          content: 'This Gmail already have binded to other account',
          lifeTime: 3000
        });
      });
  };

  const loginWithGmail = async (email: IEmail) => {
    await API.loginWithEmail(email)
      .then(res => {
        LocalStorage.accessToken.set(res.data.accessToken);
        toast.show({
          type: 'success',
          title: 'Successful',
          content: 'You are logined successfully',
          lifeTime: 3000
        });
        dispatchAuth(AuthActions.login(res.data.user));
        const previousPage = LocalStorage.previousPage.get();
        if (previousPage) {
          router.push(previousPage);
        } else {
          router.push(ROUTES.HOME);
        }
      })
      .catch(() => {
        toast.show({
          type: 'danger',
          title: 'Error',
          content: '🥲🥲🥲 This Gmail or Email is not registered',
          lifeTime: 3000
        });
      });
  };
  const openGooglePopUp = async () => {
    await signInWithGoogle();
    auth.onAuthStateChanged(user => {
      // Then use API to login with email existing
      if (user?.email) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        router.asPath == ROUTES.LOGIN ? loginWithGmail({email: user?.email}) : attachEmailToUser({email: user?.email});
      }
    });
  };
  return {openGooglePopUp};
}
