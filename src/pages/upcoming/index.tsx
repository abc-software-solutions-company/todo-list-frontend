import React, {CSSProperties, FC} from 'react';
import Layout from '@/layouts/layout';
import Upcoming from '@/components/upcoming';

export default function UpcomingPage() {
  return (
    <>
      <Upcoming className="px-12 py-6" />
    </>
  );
}

UpcomingPage.Layout = Layout;
