import {InferGetStaticPropsType} from 'next';
import React from 'react';

import ErrorInformation from '@/components/common/404';
import Seo from '@/components/common/seo/seo';
import TaskDetail from '@/components/task-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/tasks.ssr';
import LayoutDefault from '@/layouts/default';

export {getStaticPaths, getStaticProps};

export default function PageTask({task}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {name} = task;
  if (!name)
    return (
      <>
        <Seo title={'Task Not Found'} description={`Task Not Found, please check your task ID`} />
        <ErrorInformation />
      </>
    );
  return (
    <>
      <Seo title={'Task ' + name} description={`Task ${name}`} />
      <TaskDetail task={task} />
    </>
  );
}

PageTask.Layout = LayoutDefault;
