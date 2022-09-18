import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import ErrorInformation from '@/components/404';
import Seo from '@/components/seo/seo';
import LayoutDefault from '@/layouts/default';

export default function PageNotFound() {
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
