import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';
import {useRouter} from 'next/router';

import API from '@/api/network/user';
import {IEmail} from '@/api/types/email.type';
import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import LocalStorage from '@/utils/local-storage';

const auth = getAuth();

export default function useLoginGoogle() {
  const router = useRouter();
  const toast = useToast();

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
  const signOutOfGoogle = () => signOut(auth);

  const loginWithGmail = async (email: IEmail) => {
    await API.loginWithEmail(email)
      .then(res => {
        LocalStorage.accessToken.set(res.data.accessToken);
        toast.show({type: 'success', title: 'Successful', content: 'Login Successfully', lifeTime: 3000});
        const previousPage = LocalStorage.previousPage.get();
        if (router.asPath != ROUTES.LOGIN) {
          router.reload();
        } else {
          if (previousPage?.includes(ROUTES.LIST)) router.push(previousPage);
          else {
            router.reload();
          }
        }
      })
      .catch(() => {
        signOutOfGoogle();
        toast.show({type: 'danger', title: 'Error', content: 'Account not available', lifeTime: 3000});
      });
  };

  const attachEmailToUser = async (email: IEmail) => {
    await API.attachEmail(email)
      .then(() => {
        toast.show({type: 'success', title: 'Successful', content: 'Bined Gmail successfull', lifeTime: 3000});
        // eslint-disable-next-line no-self-assign
        router.reload();
      })
      .catch(() => {
        loginWithGmail(email);
        const element: HTMLElement = document.getElementsByClassName('abc-modal-close')[0] as HTMLElement;
        element.click();
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
