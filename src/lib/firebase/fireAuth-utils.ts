import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';

import {initFirebase} from '@/lib/firebase/initFirebase';
import LocalStorage from '@/utils/local-storage';

initFirebase(); // initialize firebase
const auth = getAuth();

export class FireAuthUtils {
  saveAuthProfile = () => {
    auth.onAuthStateChanged(user => {
      LocalStorage.firebaseAuthData.set(JSON.stringify(user));
    });
  };

  removeAuthProfile = () => {
    LocalStorage.firebaseAuthData.remove();
  };

  signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(() => this.saveAuthProfile())
      .catch(err => console.log(`🥲🥲🥲 ${JSON.stringify(err)} `));
  };

  signOutOfGoogle = () => {
    signOut(auth)
      .then(() => this.removeAuthProfile())
      .catch(err => console.log(`🥲🥲🥲 ${JSON.stringify(err)} `));
  };
}
