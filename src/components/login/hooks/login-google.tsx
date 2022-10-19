import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {useEffect} from 'react';

import useLoginHandler from '@/components/login/hooks/login-handler';
import api from '@/data/api';
import {IAuthLogin} from '@/data/api/types/auth.type';
import {initFirebase} from '@/lib/firebase/initFirebase';

initFirebase();
const fireAuth = getAuth();

export default function useLoginGoogle() {
  const {loginSuccess} = useLoginHandler();

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => signInWithPopup(fireAuth, googleProvider);

  const loginWithGmail = ({email, name}: IAuthLogin) => {
    api.auth
      .login({email, name})
      .then(res => {
        const {accessToken, user} = res.data;
        loginSuccess({accessToken, user});
      })
      .catch(() => {});
  };

  const openGooglePopUp = () => {
    signInWithGoogle().catch(() => {});
    fireAuth.onAuthStateChanged(user => {
      if (user?.email && user?.displayName) {
        loginWithGmail({name: user.displayName, email: user.email});
      }
    });
  };

  useEffect(() => {
    initFirebase();
  }, []);
  return {openGooglePopUp};
}
