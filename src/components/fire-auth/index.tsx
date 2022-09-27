import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';

import Button from '@/core-ui/button';
import {initFirebase} from '@/lib/firebase/initFirebase';
import LocalStorage from '@/utils/local-storage';

initFirebase(); // initialize firebase

const auth = getAuth();

const signInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  signInWithPopup(auth, googleProvider)
    .then(() => {
      console.log('😁😁😁Hello Google');
    })
    .catch(err => console.log(`🥲🥲🥲 ${JSON.stringify(err)} `));
};

const signOutOfGoogle = () => {
  signOut(auth)
    .then(() => {
      console.log('🤨 SignOut of Google Success');
    })
    .catch(err => console.log(`🥲🥲🥲 ${JSON.stringify(err)} `));
};

const FirebaseAuth = () => {
  auth.onAuthStateChanged(user => {
    LocalStorage.firebaseAuthData.set(JSON.stringify(user));
  });
  return (
    <>
      {/* <div>{renderAuth ? widget : <></>}</div> */}{' '}
      <Button
        className="btn-submit"
        variant="contained"
        color="primary"
        type="submit"
        text="Login Google"
        onClick={() => signInWithGoogle()}
      />
      <Button
        className="btn-submit"
        variant="contained"
        color="primary"
        type="submit"
        text="Logout Google"
        onClick={() => signOutOfGoogle()}
      />
    </>
  );
};

export default FirebaseAuth;
