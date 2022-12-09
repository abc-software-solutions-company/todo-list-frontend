import {InferGetStaticPropsType} from 'next';
import React from 'react';

import ErrorInformation from '@/components/common/404';
import PreLoadCKEditor from '@/components/common/ckeditor/preload';
import Seo from '@/components/common/seo/seo';
import TaskDetail from '@/components/task-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/tasks.ssr';
import LayoutDefault from '@/layouts/default';
import {useStateAuth} from '@/states/auth';

export {getStaticPaths, getStaticProps};

export default function PageTask({task}: InferGetStaticPropsType<typeof getStaticProps>) {
  const auth = useStateAuth();
  const {name, todolist, user} = task;
  if (!task) return <ErrorInformation />;
  const assest = Boolean(task) ? todolist.visibility !== 'PRIVATE' || todolist.userId === auth?.id : false;

  return (
    <>
      <p>{user?.name || ''}</p>
      <PreLoadCKEditor />
      {assest ? <Seo title={'Task ' + name} description={`Task ${name}`} /> : <Seo title={'Task Not Found'} />}
      <TaskDetail task={task} />
    </>
  );
}

PageTask.Layout = LayoutDefault;
