import React from 'react';

import Lobby from '@/components/lobby';
import Seo from '@/components/seo/seo';
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
