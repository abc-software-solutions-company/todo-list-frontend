import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IDocumentResponse} from '@/data/api/types/document.type';

import initialState, {isOpenModal} from './initialState';
import {IGetDocumentPayloadAction, ISetIsOpenModalPayload} from './types';

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getMyDocumentsRequest: state => {
      state.myDocuments.loading = true;
    },
    getMyDocumentsByListRequest: (state, {payload}: IGetDocumentPayloadAction) => {
      state.myDocuments.loading = true;
    },
    getMyDocumentsSuccess: (state, {payload}) => {
      state.myDocuments.loading = false;
      state.myDocuments.data = payload;
    },
    getMyDocumentsFailure: (state, {payload}) => {
      state.myDocuments.loading = false;
      state.myDocuments.error = payload;
    },
    getFavoriteDocumentsRequest: state => {
      state.favoriteDocuments.loading = true;
    },
    getFavoriteDocumentsSuccess: (state, {payload}) => {
      state.favoriteDocuments.loading = false;
      state.favoriteDocuments.data = payload;
    },
    getFavoriteDocumentsFailure: (state, {payload}) => {
      state.favoriteDocuments.loading = false;
      state.favoriteDocuments.error = payload;
    },
    setSelectedDocument: (state, {payload}: PayloadAction<IDocumentResponse | undefined>) => {
      state.selectedDocument = payload;
    },
    setIsOpenModal: (state, {payload}: PayloadAction<ISetIsOpenModalPayload>) => {
      const newIsOpenModal = {...isOpenModal};
      Object.keys(newIsOpenModal).map(e => {
        if (e == payload) newIsOpenModal[e] = true;
      });
      state.isOpenModal = newIsOpenModal;
    }
  }
});

export default documentsSlice;
