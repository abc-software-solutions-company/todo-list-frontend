import React from 'react';

import Seo from '@/components/common/seo/seo';
import List from '@/components/lists';
import NewLayout from '@/layouts/new-layout';

export default function ListPage() {
  return (
    <>
      <Seo title="My Lists" />
      <List />
    </>
  );
}

ListPage.Layout = NewLayout;
