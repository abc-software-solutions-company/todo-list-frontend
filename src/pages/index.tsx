import {InferGetStaticPropsType} from 'next';
import React from 'react';

import {getStaticProps} from '@/data/ssr/home.ssr';
import LayoutDefault from '@/layouts/default';

import CreateRoom from './create-room';

export {getStaticProps};

export default function PageHome({}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <CreateRoom />
    </>
  );
}

PageHome.Layout = LayoutDefault;
