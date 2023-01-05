import {InferGetStaticPropsType} from 'next';
import React from 'react';

import KanbanDetail from '@/components/board';
import ErrorInformation from '@/components/common/404';
import Seo from '@/components/common/seo/seo';
import ToolBar from '@/components/toolbar-list-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/lists.ssr';
import NewLayout from '@/layouts/new-layout';

export {getStaticPaths, getStaticProps};

export default function PageListDetailKanban({id, seo}: InferGetStaticPropsType<typeof getStaticProps>) {
  const publicSiteURL = process.env.NEXT_PUBLIC_SITE_URL;
  if (publicSiteURL?.includes('localhost') || publicSiteURL?.includes('stage'))
    return (
      <>
        <Seo {...seo} />
        <ToolBar />
        <KanbanDetail id={id} />
      </>
    );
  return <ErrorInformation />;
}

PageListDetailKanban.Layout = NewLayout;
