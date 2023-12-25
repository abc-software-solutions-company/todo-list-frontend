import React from 'react';
import Seo from '@/components/common/seo/seo';
import MyTasks from '@/components/my-tasks';
import NewLayout from '@/layouts/new-layout';

export default function PageMyTask() {
  return (
    <>
      <Seo title="My Tasks" />
      <MyTasks />
    </>
  );
}

PageMyTask.Layout = NewLayout;
