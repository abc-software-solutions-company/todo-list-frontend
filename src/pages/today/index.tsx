import Today from '@/components/home/today';
import Layout from '@/layouts/layout';
import React from 'react';

export default function TodayPage() {
  return (
    <>
      <Today />
    </>
  );
}

TodayPage.Layout = Layout;
