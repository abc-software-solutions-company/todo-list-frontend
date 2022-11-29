import {InferGetStaticPropsType} from 'next';
import React from 'react';

import Kanban from '@/components/kanban';
import {getStaticPaths, getStaticProps} from '@/data/ssr/lists.ssr';
import LayoutDefault from '@/layouts/default';

export {getStaticPaths, getStaticProps};

export default function BoardPage({id}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Kanban id={id} />
    </>
  );
}

BoardPage.Layout = LayoutDefault;
