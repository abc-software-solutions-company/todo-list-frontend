import {InferGetStaticPropsType} from 'next';
import React from 'react';

import {getStaticProps} from '@/data/ssr/home.ssr';
import LayoutDefault from '@/layouts/default';
import HomePage from './home';
import ModalDelete from '@/components/modal-delete';
import ButtonModal from '@/components/button-modal';
import ModalCtx from '@/contexts/modal.context';
import UseModalInitialState from '@/hooks/useModalInitialState';
import EnterYourName from '@/components/enter-your-name';

export {getStaticProps};

export default function PageHome({}: InferGetStaticPropsType<typeof getStaticProps>) {
  const initalState = UseModalInitialState();

  return (
    <>
      <HomePage />
      {/* <ModalCtx.Provider value={initalState}>
        <ButtonModal />
        <ModalDelete nameOfItem="Shopping" />
      </ModalCtx.Provider> */}
    </>
  );
}

PageHome.Layout = LayoutDefault;
