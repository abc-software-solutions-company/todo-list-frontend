import React, {CSSProperties, FC} from 'react';
import Layout from '@/layouts/layout';
import Upcoming from '@/components/upcoming';

export default function UpcomingPage() {
  return (
    <>
      <Upcoming />
    </>
  );
}

UpcomingPage.Layout = Layout;
