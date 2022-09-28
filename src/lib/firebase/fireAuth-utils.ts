import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';

import API from '@/api/network/user';
import {IEmail} from '@/api/types/email.type';
import {initFirebase} from '@/lib/firebase/initFirebase';
import LocalStorage from '@/utils/local-storage';

initFirebase(); // initialize firebase
const auth = getAuth();

export class FireAuthUtils {
  attachEmailToUser = async (email: IEmail) => {
    await API.attachEmail(email)
      .then(() => {})
      .catch(() => {});
  };

  saveAuthProfile = () => {
    auth.onAuthStateChanged(user => {
      LocalStorage.firebaseAuthData.set(JSON.stringify(user));
      if (user?.email) {
        this.attachEmailToUser({email: user?.email});
      }
    });
  };

  removeAuthProfile = () => {
    LocalStorage.firebaseAuthData.remove();
  };

  signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(() => {
        this.saveAuthProfile();
        return '😁😁😁😁😁😁🏘️🏘️🏘️Logined SuccessFully';
      })
      .catch(() => {
        return '🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️Logined SuccessFully';
      });
  };

  signOutOfGoogle = () => {
    signOut(auth)
      .then(() => {
        this.removeAuthProfile();
        LocalStorage.accessToken.remove();
      })
      .catch(err => console.log(`🥲🥲🥲 ${JSON.stringify(err)} `));
  };
}
