import {InferGetStaticPropsType} from 'next';
import React from 'react';

import Seo from '@/components/common/seo/seo';
import Kanban from '@/components/kanban';
import {getStaticPaths, getStaticProps} from '@/data/ssr/list.ssr';
import LayoutDefault from '@/layouts/default';
import {useStateAuth} from '@/states/auth';

export {getStaticPaths, getStaticProps};

export default function BoardPage({list}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {id, name, tasks} = list;
  const auth = useStateAuth();
  const description = `${tasks[0]?.name || ''} ${tasks[1]?.name || ''} ${tasks[2]?.name || ''}`;

  const assest = Boolean(list) ? list.visibility !== 'PRIVATE' || list.userId === auth?.id : false;

  return (
    <>
      {assest ? <Seo title={name} description={`List ${name}. ${description}`} /> : <Seo title={'Task Not Found'} />}
      <Kanban id={id} />
    </>
  );
}

BoardPage.Layout = LayoutDefault;
