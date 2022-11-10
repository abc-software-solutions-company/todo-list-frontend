import {InferGetStaticPropsType} from 'next';
import React from 'react';

import ErrorInformation from '@/components/common/404';
import Seo from '@/components/common/seo/seo';
import TaskDetail from '@/components/task-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/tasks.ssr';
import LayoutDefault from '@/layouts/default';
import {useStateAuth} from '@/states/auth';

export {getStaticPaths, getStaticProps};

export default function PageTask({task}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {name, todolist} = task;
  const auth = useStateAuth();
  const assest = Boolean(task) ? todolist.visibility !== 'PRIVATE' || Boolean(auth && auth.id === todolist.userId) : false;

  if (!name || !assest)
    return (
      <>
        <Seo title={'Task Not Found'} />
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
