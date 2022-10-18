import React from 'react';

import Login from '@/components/login';
import Seo from '@/components/common/seo/seo';
import LayoutDefault from '@/layouts/default';

export default function PageLogin() {
  return (
    <>
      <Seo title="Login" />
      <Login />;
    </>
  );
}

PageLogin.Layout = LayoutDefault;
