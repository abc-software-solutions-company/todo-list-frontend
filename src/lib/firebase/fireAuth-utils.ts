import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';

import {initFirebase} from '@/lib/firebase/initFirebase';
import LocalStorage from '@/utils/local-storage';

initFirebase(); // initialize firebase
const auth = getAuth();

export class FireAuthUtils {
  attachEmailToUser = (email: string | null | undefined) => {
    console.log('🏘️📧 Your Email is registered successfully');
    console.log(`🤩Will be save email ${email} to user record in postgres lately`);
  };

  saveAuthProfile = () => {
    auth.onAuthStateChanged(user => {
      LocalStorage.firebaseAuthData.set(JSON.stringify(user));
      this.attachEmailToUser(user?.email);
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
