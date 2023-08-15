import {InferGetStaticPropsType} from 'next';
import {useRouter} from 'next/router';
import React from 'react';

import ErrorInformation from '@/components/common/404';
import PreLoadCKEditor from '@/components/common/ckeditor/preload';
import Seo from '@/components/common/seo/seo';
import TaskDetail from '@/components/task-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/tasks.ssr';
import LayoutDefault from '@/layouts/default';

export {getStaticPaths, getStaticProps};

export default function PageTask({task}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const {name} = task;
  if (!task) return <ErrorInformation />;
  if (!router.asPath.includes(task.id)) return null;

  return (
    <>
      <PreLoadCKEditor />
      <Seo title={'Task ' + name} description={`Task ${name}`} />
      <TaskDetail task={task} className="sm:container" />
    </>
  );
}

PageTask.Layout = LayoutDefault;
