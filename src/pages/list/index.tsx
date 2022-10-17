import React from 'react';

import MyList from '@/components/my-list';
import Seo from '@/components/seo/seo';
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
