import {InferGetStaticPropsType} from 'next';
import {useRouter} from 'next/router';
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
  const router = useRouter();
  const auth = useStateAuth();
  const {name, todolist} = task;
  if (!task) return <ErrorInformation />;
  const assest = Boolean(task)
    ? todolist.visibility !== 'PRIVATE' ||
      todolist.userId === auth?.id ||
      todolist.members?.map(e => e.user?.id).includes(auth?.id)
    : false;
  if (!router.asPath.includes(task.id)) return null;

  return (
    <>
      <PreLoadCKEditor />
      {assest ? <Seo title={'Task ' + name} description={`Task ${name}`} /> : <Seo title={'Task Not Found'} />}
      <TaskDetail task={task} className="sm:container" />
    </>
  );
}

PageTask.Layout = LayoutDefault;
