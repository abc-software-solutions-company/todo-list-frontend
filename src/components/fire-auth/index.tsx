import {getAuth} from 'firebase/auth';
import {ReactElement, useEffect, useState} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import {initFirebase} from '@/lib/firebase/initFirebase';
import LocalStorage from '@/utils/local-storage';

import {firebaseAuthConfig} from './auth-config';

initFirebase(); // initialize firebase

const auth = getAuth();

const FirebaseAuth = () => {
  const [widget, setWidget] = useState<ReactElement>(<></>);
  // Do not SSR FirebaseUI, because it is not supported.
  //FIXME: Don't disable React Strict Mode
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  auth.onAuthStateChanged(user => {
    LocalStorage.firebaseAuthData.set(JSON.stringify(user));
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);
      setWidget(<StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={auth} />);
    }
  }, []);
  return (
    <>
      <div>{renderAuth ? widget : <></>}</div>
    </>
  );
};

export default FirebaseAuth;
