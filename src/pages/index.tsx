import React from 'react';

import Seo from '@/components/common/seo/seo';
import Lobby from '@/components/lobby';
import LayoutDefault from '@/layouts/default';

export default function PageHome() {
  return (
    <>
      <Seo title="Lobby" />
      <Lobby />
    </>
  );
}

PageHome.Layout = LayoutDefault;
