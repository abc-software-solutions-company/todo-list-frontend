import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useContext} from 'react';

import ErrorInformation from '@/components/404';
import Seo from '@/components/seo/seo';
import {ThemeContext} from '@/hooks/useAuthContext';
import LayoutDefault from '@/layouts/default';

export default function PageNotFound() {
  const theme = useContext(ThemeContext);
  console.log('😎😎😎😎');
  console.log(theme);
  return (
    <>
      <Seo title="404" description="404 description" />
      <ErrorInformation />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const translate = await serverSideTranslations(locale!, ['common']);

  return {
    props: {
      ...translate
    }
  };
};

PageNotFound.Layout = LayoutDefault;
