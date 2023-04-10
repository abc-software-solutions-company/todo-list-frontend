import {IDocumentResponse} from '@/data/api/types/document.type';

import {IInitialState} from './types';

export const isOpenModal = {
  edit: false,
  delete: false,
  share: false
};

const initialState: IInitialState = {
  myDocuments: {
    loading: false,
    data: [] as IDocumentResponse[],
    error: null
  },
  favoriteDocuments: {
    loading: false,
    data: [] as IDocumentResponse[],
    error: null
  },
  selectedDocument: undefined,
  isOpenModal
};

export default initialState;
