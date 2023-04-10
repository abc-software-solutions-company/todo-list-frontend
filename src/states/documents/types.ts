import {PayloadAction} from '@reduxjs/toolkit';

import {IDocumentResponse} from '@/data/api/types/document.type';

import {isOpenModal} from './initialState';

interface IGetDocumentPayload {
  todolistId: string;
}

export type IGetDocumentPayloadAction = PayloadAction<IGetDocumentPayload>;

export type ISetIsOpenModalPayload = keyof typeof isOpenModal | null;

export interface IInitialState {
  myDocuments: {
    loading: boolean;
    data: IDocumentResponse[];
    error: any;
  };
  favoriteDocuments: {
    loading: boolean;
    data: IDocumentResponse[];
    error: any;
  };
  selectedDocument?: IDocumentResponse;
  isOpenModal: {
    edit: boolean;
    delete: boolean;
    share: boolean;
  };
}
