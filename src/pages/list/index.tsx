import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import React from 'react';

import List from '@/components/list';
import Seo from '@/components/seo/seo';
import LayoutDefault from '@/layouts/default';
import Seo from '@/components/seo/seo';

export default function ListPage() {
  return (
    <>
      <Seo title="My List" />
      <List />
    </>
  );
}

ListPage.Layout = LayoutDefault;

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const translate = await serverSideTranslations(locale!, ['common']);

  return {
    props: {
      ...translate
    }
  };
};
