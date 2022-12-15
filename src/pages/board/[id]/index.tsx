import {InferGetStaticPropsType} from 'next';
import React from 'react';

import Seo from '@/components/common/seo/seo';
import ListDetail from '@/components/lists-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/lists.ssr';
import LayoutDefault from '@/layouts/default';

export {getStaticPaths, getStaticProps};

export default function PageListDetailKanban({id, seo}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Seo {...seo} />
      <ListDetail id={id} />
    </>
  );
}

PageListDetailKanban.Layout = LayoutDefault;
