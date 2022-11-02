import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import ErrorInformation from '@/components/common/404';
import Seo from '@/components/common/seo/seo';
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
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};

PageNotFound.Layout = LayoutDefault;
