import {InferGetStaticPropsType} from 'next';
import React from 'react';

import {getStaticPaths, getStaticProps} from '@/data/ssr/lists.ssr';
import Layout from '@/layouts/layout';

import ProjectDetail from '@/components/project-detail';
import Seo from '@/components/common/seo/seo';

export {getStaticPaths, getStaticProps};

export default function PageProjectDetail({id, seo}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Seo {...seo} />
      <ProjectDetail id={id} />
    </>
  );
}

PageProjectDetail.Layout = Layout;
