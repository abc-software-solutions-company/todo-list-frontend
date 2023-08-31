import React from 'react';

import Seo from '@/components/common/seo/seo';
import Documents from '@/components/documents';
import ToolBar from '@/components/toolbar-list-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/lists.ssr';
import NewLayout from '@/layouts/new-layout';

export {getStaticPaths, getStaticProps};

export default function DocumentsPage() {
  return (
    <>
      <Seo title="My Lists" />
      <ToolBar option={false} />
      <Documents />
    </>
  );
}
DocumentsPage.Layout = NewLayout;
