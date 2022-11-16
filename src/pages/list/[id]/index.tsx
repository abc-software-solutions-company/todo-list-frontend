import {InferGetStaticPropsType} from 'next';
import React from 'react';

import Seo from '@/components/common/seo/seo';
import ListDetail from '@/components/list-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/list.ssr';
import LayoutDefault from '@/layouts/default';

export {getStaticPaths, getStaticProps};

export default function PageListDetail({list}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {id, name, tasks} = list;
  const description = `${tasks[0]?.name || ''} ${tasks[1]?.name || ''} ${tasks[2]?.name || ''}`;

  const assest = Boolean(list) ? list.visibility !== 'PRIVATE' : false;

  return (
    <>
      {assest ? <Seo title={name} description={`List ${name}. ${description}`} /> : <Seo title={'Task Not Found'} />}
      <ListDetail id={id} />
    </>
  );
}

PageListDetail.Layout = LayoutDefault;
