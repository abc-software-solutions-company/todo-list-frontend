import React from 'react';

import Seo from '@/components/common/seo/seo';
import MyTasks from '@/components/my-tasks';
import LayoutDefault from '@/layouts/default';

export default function PageMyTask() {
  return (
    <>
      <Seo title="My Tasks" />
      <MyTasks />
    </>
  );
}

PageMyTask.Layout = LayoutDefault;
