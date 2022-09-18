import {useRouter} from 'next/router';
import React, {FC, ReactNode, useEffect} from 'react';

// import {ROUTES} from '@/configs/routes.config';
// import {useStateAuth} from '@/contexts/auth/context';
import {GlobalActions} from '@/contexts/global';
import {useStateGlobal} from '@/contexts/global/context';

interface IProps {
  children?: ReactNode;
}

const PageWrap: FC<IProps> = ({children}) => {
  const router = useRouter();
  const global = useStateGlobal();
  // const auth = useStateAuth();

  function authCheck(url: string) {
    console.log('page', url);
    GlobalActions.setMenuOpen(!global.isMenuOpen);
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('hashChangeComplete', authCheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <pre>{JSON.stringify(auth)}</pre> */}
      {children}
    </>
  );
};

export default PageWrap;
