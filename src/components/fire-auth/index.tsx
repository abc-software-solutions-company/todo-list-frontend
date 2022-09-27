import {EmailAuthProvider, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, getAuth} from 'firebase/auth';
import Head from 'next/head';
import {ReactElement, useEffect, useState} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import {initFirebase} from '@/lib/firebase/initFirebase';
import {mapUserData} from '@/lib/firebase/mapUserData';
import {setUserCookie} from '@/lib/firebase/userCookies';

initFirebase(); // initialize firebase

const auth = getAuth();

const firebaseAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    // add additional auth flows below
    GoogleAuthProvider.PROVIDER_ID,
    TwitterAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/terms-of-service',
  privacyPolicyUrl: '/privacy-policy',
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: async ({user}, redirectUrl) => {
      const userData = mapUserData(user);
      setUserCookie(userData);
    }
  }
};

const FirebaseAuth = () => {
  const [widget, setWidget] = useState<ReactElement>(<></>);
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
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
