import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';

import API from '@/api/network/user';
import {IEmail} from '@/api/types/email.type';
import {initFirebase} from '@/lib/firebase/initFirebase';
import LocalStorage from '@/utils/local-storage';

initFirebase(); // initialize firebase
const auth = getAuth();

export class FireAuthUtils {
  attachEmailToUser = async (email: IEmail) => {
    console.log('🏘️📧 Your Email is registered successfully');
    console.log(`🤩Will be save email ${email} to user record in postgres lately`);
    await API.attachEmail(email)
      .then(() => {
        console.log('🤩🤩🤩🤩 Bind to Gmail Successfull');
      })
      .catch(() => {
        console.log('😓😓Cannot get Gmail');
      });
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
      .then(() => this.saveAuthProfile())
      .catch(err => console.log(`🥲🥲🥲 ${JSON.stringify(err)} `));
  };

  signOutOfGoogle = () => {
    signOut(auth)
      .then(() => this.removeAuthProfile())
      .catch(err => console.log(`🥲🥲🥲 ${JSON.stringify(err)} `));
  };
}
