import {InferGetStaticPropsType} from 'next';
import React from 'react';

import {getStaticProps} from '@/data/ssr/home.ssr';
import LayoutDefault from '@/layouts/default';
import HomePage from './home';
import ButtonModal from '@/components/button-modal';
import UseDelModalInitialState from '@/hooks/useDelModalInitialState';
import ModalCtx from '@/contexts/modal.context';
import ModalDelete from '@/components/modal-delete';

export {getStaticProps};

export default function PageHome({}: InferGetStaticPropsType<typeof getStaticProps>) {
  const modalAppContext = UseDelModalInitialState();

  return (
    <>
      <ModalCtx.Provider value={modalAppContext}>
        <ButtonModal />
        <ModalDelete heading="task By card" />
      </ModalCtx.Provider>
    </>
  );
}

PageHome.Layout = LayoutDefault;
