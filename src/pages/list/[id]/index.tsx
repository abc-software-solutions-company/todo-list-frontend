import {InferGetStaticPropsType} from 'next';
import React from 'react';

import ErrorInformation from '@/components/common/404';
import Seo from '@/components/common/seo/seo';
import ListDetail from '@/components/list-detail';
import {getStaticPaths, getStaticProps} from '@/data/ssr/list.ssr';
import LayoutDefault from '@/layouts/default';
import {useStateAuth} from '@/states/auth';

export {getStaticPaths, getStaticProps};

export default function PageListDetail({list}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {id, name, tasks} = list;
  const description = `${tasks[0]?.name || ''} ${tasks[1]?.name || ''} ${tasks[2]?.name || ''}`;

  const auth = useStateAuth();

  const assest = Boolean(list) ? list.visibility !== 'PRIVATE' || Boolean(auth && auth.id === list.userId) : false;

  if (!assest)
    return (
      <>
        <Seo title={'Task Not Found'} />
        <ErrorInformation />
      </>
    );
  return (
    <>
      <Seo title={name} description={`List ${name}. ${description}`} />
      <ListDetail id={id} />
    </>
  );
}

PageListDetail.Layout = LayoutDefault;
