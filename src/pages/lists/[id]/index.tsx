import {InferGetStaticPropsType} from 'next';
import React from 'react';

import Seo from '@/components/common/seo/seo';
import ListDetail from '@/components/list-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/lists.ssr';
import LayoutDefault from '@/layouts/default';

export {getStaticPaths, getStaticProps};

export default function PageListDetail({id, seo}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Seo {...seo} />
      <ListDetail id={id} />
    </>
  );
}

PageListDetail.Layout = LayoutDefault;
