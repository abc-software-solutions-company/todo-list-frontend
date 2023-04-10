import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {IDocumentResponse} from '@/data/api/types/document.type';
import {getErrorMessage} from '@/utils/error-handle';

import documentsSlice from './slice';
import {IGetDocumentPayloadAction} from './types';

function* getMyDocuments() {
  try {
    const response: AxiosResponse<[], any> = yield call(() => api.document.get());
    yield put(documentsSlice.actions.getMyDocumentsSuccess(response.data));
  } catch (error) {
    yield put(documentsSlice.actions.getMyDocumentsFailure(getErrorMessage(error)));
  }
}

function* getMyDocumentsByList({payload}: IGetDocumentPayloadAction) {
  try {
    const response: AxiosResponse<IDocumentResponse[], any> = yield call(() => api.document.getByList(payload));
    yield put(documentsSlice.actions.getMyDocumentsSuccess(response.data));
  } catch (error) {
    yield put(documentsSlice.actions.getMyDocumentsFailure(getErrorMessage(error)));
  }
}

function* getFavoriteDocuments() {
  try {
    const response: AxiosResponse<IDocumentResponse[], any> = yield call(() => api.document.getFavorite());
    yield put(documentsSlice.actions.getFavoriteDocumentsSuccess(response.data));
  } catch (error) {
    yield put(documentsSlice.actions.getFavoriteDocumentsFailure(getErrorMessage(error)));
  }
}

export default function* documentsSaga() {
  yield all([
    takeLatest(documentsSlice.actions.getMyDocumentsByListRequest, getMyDocumentsByList),
    takeLatest(documentsSlice.actions.getMyDocumentsRequest, getMyDocuments),
    takeLatest(documentsSlice.actions.getFavoriteDocumentsRequest, getFavoriteDocuments)
  ]);
}
