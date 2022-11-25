import React from 'react';

import Seo from '@/components/common/seo/seo';
import List from '@/components/lists';
import LayoutDefault from '@/layouts/default';

export default function ListPage() {
  return (
    <>
      <Seo title="My Lists" />
      <List />
    </>
  );
}

ListPage.Layout = LayoutDefault;
