import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';

import api from '@/data/api/index';
import {initFirebase} from '@/lib/firebase/initFirebase';
import LocalStorage from '@/utils/local-storage';

initFirebase(); // initialize firebase
const auth = getAuth();

export class FireAuthUtils {
  saveAuthProfile = () => {
    auth.onAuthStateChanged(async user => {
      if (user?.email) {
        const email = user.email;
        await api.auth
          .login({name: '', email: email})
          .then(() => {})
          .catch(() => {});
      }
    });
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
        indexedDB.deleteDatabase('firebaseLocalStorageDb');
        LocalStorage.accessToken.remove();
        LocalStorage.previousPage.remove();
      })
      .catch(err => console.log(`🥲🥲🥲 ${JSON.stringify(err)} `));
  };
}
