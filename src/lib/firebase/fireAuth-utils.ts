import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';

import API from '@/data/api/index';
import {initFirebase} from '@/lib/firebase/initFirebase';
import LocalStorage from '@/utils/local-storage';

initFirebase(); // initialize firebase
const auth = getAuth();

export class FireAuthUtils {
  saveAuthProfile = () => {
    auth.onAuthStateChanged(async user => {
      LocalStorage.firebaseAuthData.set(JSON.stringify(user));
      if (user?.email) {
        const email = user.email;
        await API.auth
          .login({name: '', email: email})
          .then(() => {})
          .catch(() => {});
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
