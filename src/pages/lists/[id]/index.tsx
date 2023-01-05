import {InferGetStaticPropsType} from 'next';
import React from 'react';

import Seo from '@/components/common/seo/seo';
import ListDetail from '@/components/lists-detail';
import ToolBar from '@/components/toolbar-list-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/lists.ssr';
import NewLayout from '@/layouts/new-layout';

export {getStaticPaths, getStaticProps};

export default function PageListDetail({id, seo}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Seo {...seo} />
      <ToolBar />
      <ListDetail id={id} />
    </>
  );
}

PageListDetail.Layout = NewLayout;
