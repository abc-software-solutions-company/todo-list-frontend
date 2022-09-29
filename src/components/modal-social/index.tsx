import cls from 'classnames';
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import API from '@/api/network/user';
import {IEmail} from '@/api/types/email.type';
import {ROUTES} from '@/configs/routes.config';
import {AuthActions} from '@/contexts/auth';
import {useDispatchAuth} from '@/contexts/auth/context';
import Button from '@/core-ui/button';
import useToast from '@/core-ui/toast';
import LocalStorage from '@/utils/local-storage';

import {Modal} from '../../core-ui/modal';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  onClose: () => void;
}
const auth = getAuth();

const ModalSocial: React.FC<IProps> = ({open, onClose}) => {
  const [reload, setReload] = useState(false);
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
      // Check if this modal open from Page Home
      console.log(router.asPath == ROUTES.LOGIN);
      // Then use API to login with email existing
      if (user?.email) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        router.asPath == ROUTES.LOGIN ? loginWithGmail({email: user?.email}) : attachEmailToUser({email: user?.email});
      }
    });
  };
  useEffect(() => {
    setReload(!reload);
  }, []);
  return (
    <Modal variant="center" className={cls(styles['com-modal-social'], 'max-w-[378px]')} open={open} onClose={onClose}>
      <Modal.Header />
      <Modal.Body className="container">
        <Button className=" bg-white text-black" onClick={() => openGooglePopUp()}>
          <img src="/google.png" />
          <span>Sign in with Google</span>
        </Button>
        <Button className="mt-5 bg-blue-600  text-white">
          <img src="/facebook.png" />
          <span>Sign in with Facebook</span>
        </Button>
        <Button className="mt-5 bg-sky-400  text-white">
          <img src="/twitter.png" />
          <span>Sign in with Twitter</span>
        </Button>
        <Button className="mt-5 bg-slate-800  text-white">
          <img src="/github.png" />
          <span>Sign in with Github</span>
        </Button>
        <Button className="mt-5 bg-red-600  text-white">
          <img src="/email-filled.png" />
          <span>Sign in with Email</span>
        </Button>
        <Button className="mt-5 bg-green-500  text-white">
          <img src="/phone-filled.png" />
          <span>Sign in with Phone</span>
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSocial;
