import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import React from 'react';

import Lobby from '@/components/lobby';
import Seo from '@/components/seo/seo';
import LayoutDefault from '@/layouts/default';
import Seo from '@/components/seo/seo';

export default function PageHome() {
  return (
    <>
      <Seo title="Lobby" />
      <Lobby />
    </>
  );
}

PageHome.Layout = LayoutDefault;

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const translate = await serverSideTranslations(locale!, ['common']);

  return {
    props: {
      ...translate
    }
  };
};
