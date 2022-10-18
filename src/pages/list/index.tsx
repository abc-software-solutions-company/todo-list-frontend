import React from 'react';

import Seo from '@/components/common/seo/seo';
import MyList from '@/components/list';
import LayoutDefault from '@/layouts/default';

export default function ListPage() {
  return (
    <>
      <Seo title="My List" />
      <MyList />
    </>
  );
}

ListPage.Layout = LayoutDefault;
