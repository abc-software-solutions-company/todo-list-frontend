import React from 'react';

import Seo from '@/components/common/seo/seo';
import Lobby from '@/components/lobby';
import LobbyLayout from '@/layouts/lobby';

export default function PageHome() {
  return (
    <>
      <Seo title="Lobby" />
      <Lobby />
    </>
  );
}

PageHome.Layout = LobbyLayout;
