import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {useRouter} from 'next/router';

import API from '@/api/network/user';
import {IEmail} from '@/api/types/email.type';
import {ROUTES} from '@/configs/routes.config';
import useToast from '@/lib/core-ui/toast';
import useLoginHandler from '@/hooks/login/workflow/login-handler';

const auth = getAuth();

export default function useLoginGoogle() {
  const router = useRouter();
  const toast = useToast();

  const {loginSuccess} = useLoginHandler();

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const loginWithGmail = async (email: IEmail) => {
    await API.loginWithEmail(email)
      .then(res => {
        loginSuccess(res);
      })
      .catch(() => {
        auth.onAuthStateChanged(user => {
          // Then use API to login with email existing
          if (user?.email) {
            API.createUser({userName: user?.displayName || ''}).then(res => {
              loginSuccess(res);
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              attachEmailToUser({email: user?.email || ''});
            });
          }
        });
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
