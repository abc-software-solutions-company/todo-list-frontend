import {InferGetStaticPropsType} from 'next';
import React from 'react';

import {getStaticProps} from '@/data/ssr/home.ssr';
import LayoutDefault from '@/layouts/default';

import CreateList from './create-list';
import HomePage from './home';

export {getStaticProps};

export default function PageHome({}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <CreateList />
      <HomePage />
    </>
  );
}

PageHome.Layout = LayoutDefault;
