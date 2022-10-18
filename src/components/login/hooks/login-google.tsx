import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

import useLoginHandler from '@/components/login/hooks/login-handler';
import {ROUTES} from '@/configs/routes.config';
import api from '@/data/api';
import {IAuthLogin} from '@/data/api/types/auth.type';
import {initFirebase} from '@/lib/firebase/initFirebase';

initFirebase();
const fireAuth = getAuth();

export default function useLoginGoogle() {
  const router = useRouter();

  const {loginSuccess} = useLoginHandler();

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => signInWithPopup(fireAuth, googleProvider);

  const loginWithGmail = ({email}: IAuthLogin) => {
    api.auth
      .login({email})
      .then(res => {
        loginSuccess(res.data);
      })
      .catch(() => {
        //FIXME: KIMOCHI
        // fireAuth.onAuthStateChanged(gmail => {
        //   if (gmail?.email) {
        //     // eslint-disable-next-line @typescript-eslint/no-shadow
        //     const {email, displayName: name} = gmail;
        //     if (name) {
        //       api.auth.login({email, name}).then(res => {
        //         const {accessToken, user} = res.data;
        //         loginSuccess({accessToken, user});
        //       });
        //     }
        //   }
        // });
      });
  };

  const openGooglePopUp = async () => {
    await signInWithGoogle().catch(() => {});
    fireAuth.onAuthStateChanged(user => {
      if (user?.email) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        router.asPath == ROUTES.LOGIN && loginWithGmail({name: user.displayName!, email: user.email});
      }
    });
  };

  useEffect(() => {
    initFirebase();
  }, []);
  return {openGooglePopUp};
}
