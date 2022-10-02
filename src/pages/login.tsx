import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import React from 'react';

import Login from '@/components/login';
import LayoutDefault from '@/layouts/default';
import Seo from '@/components/seo/seo';

export default function PageLogin() {
  return (
    <>
      <Seo title="Login" />
      <Login />;
    </>
  );
}

PageLogin.Layout = LayoutDefault;

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};
