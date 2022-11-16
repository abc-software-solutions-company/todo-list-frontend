import {InferGetStaticPropsType} from 'next';
import React from 'react';

import Seo from '@/components/common/seo/seo';
import TaskDetail from '@/components/task-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/tasks.ssr';
import LayoutDefault from '@/layouts/default';

export {getStaticPaths, getStaticProps};

export default function PageTask({task}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {name, todolist} = task;

  const assest = Boolean(task) ? todolist.visibility !== 'PRIVATE' : false;

  return (
    <>
      {assest ? <Seo title={'Task ' + name} description={`Task ${name}`} /> : <Seo title={'Task Not Found'} />}
      <TaskDetail task={task} />
    </>
  );
}

PageTask.Layout = LayoutDefault;
