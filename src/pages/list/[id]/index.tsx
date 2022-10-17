import {useRouter} from 'next/router';
import React from 'react';

import ListDetail from '@/components/list-detail';
import Seo from '@/components/seo/seo';
import LayoutDefault from '@/layouts/default';

export default function PageListDetail() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Seo title={`List ID ${id}`} />
      <ListDetail id={id} />;
    </>
  );
}

PageListDetail.Layout = LayoutDefault;
