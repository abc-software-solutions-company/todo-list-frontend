import {InferGetStaticPropsType} from 'next';
import React from 'react';

import Seo from '@/components/common/seo/seo';
import TaskDetail from '@/components/task-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/tasks.ssr';
import LayoutDefault from '@/layouts/default';

export {getStaticPaths, getStaticProps};

export default function PageTask({task}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('🚀 ~ file: index.tsx ~ line 11 ~ PageTask ~ task', task);
  const {name} = task;
  return (
    <>
      <Seo title={'Task ' + name} description={`Task ${name}`} />
      <TaskDetail task={task} />
    </>
  );
}

PageTask.Layout = LayoutDefault;
