import {useRouter} from 'next/router';
import React from 'react';

import Seo from '@/components/common/seo/seo';
import ListDetail from '@/components/list/list-detail';
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
