import {InferGetStaticPropsType} from 'next';
import React from 'react';

import {getStaticPaths, getStaticProps} from '@/data/ssr/lists.ssr';
import Layout from '@/layouts/layout';

import ProjectDetail from '@/components/project-detail';

export {getStaticPaths, getStaticProps};

export default function PageProjectDetail({id}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ProjectDetail id={id} />
    </>
  );
}

PageProjectDetail.Layout = Layout;
