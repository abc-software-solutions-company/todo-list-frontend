// import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import API from '@/data/api';
import {IAuthLogin} from '@/data/api/types/auth.type';
import useLoginHandler from '@/hooks/login/workflow/login-handler';

// const fireAuth = getAuth();

export default function useLoginGoogle() {
  // const router = useRouter();

  // const {loginSuccess} = useLoginHandler();

  // const googleProvider = new GoogleAuthProvider();
  // const signInWithGoogle = () => signInWithPopup(fireAuth, googleProvider);

  // const loginWithGmail = async ({email}: IAuthLogin) => {
  //   await API.auth
  //     .login({email})
  //     .then(res => {
  //       const {accessToken, user} = res.data;
  //       loginSuccess({accessToken, user});
  //     })
  //     .catch(() => {
  //       fireAuth.onAuthStateChanged(gmail => {
  //         if (gmail?.email) {
  //           // eslint-disable-next-line @typescript-eslint/no-shadow
  //           const {email, displayName} = gmail;
  //           API.auth.login({email, name: displayName!}).then(res => {
  //             const {accessToken, user} = res.data;
  //             loginSuccess({accessToken, user});
  //           });
  //         }
  //       });
  //     });
  // };

  // const openGooglePopUp = async () => {
  //   await signInWithGoogle();
  //   fireAuth.onAuthStateChanged(user => {
  //     if (user?.email) {
  //       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //       router.asPath == ROUTES.LOGIN && loginWithGmail({email: user?.email});
  //     }
  //   });
  // };
  // return {openGooglePopUp};
  return <p>Login PopUp</p>;
}
