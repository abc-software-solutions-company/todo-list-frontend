import {useDispatch, useSelector} from 'react-redux';

import {IDocumentResponse} from '@/data/api/types/document.type';
import {RootState} from '@/states/store';

import documentsSlice from './slice';
import {ISetIsOpenModalPayload} from './types';

export default function useDocuments() {
  const state = useSelector((root: RootState) => root.documents);
  const {myDocuments: myDocumentsData, favoriteDocuments: favoriteDocumentsData, ...rest} = state;
  const myDocuments = myDocumentsData.data;
  const favoriteDocuments = favoriteDocumentsData.data;
  const dispatch = useDispatch();

  const {actions} = documentsSlice;
  const getDocumentByList = (todolistId: string) => dispatch(actions.getMyDocumentsByListRequest({todolistId}));
  const get = () => {
    dispatch(actions.getMyDocumentsRequest());
    dispatch(actions.getFavoriteDocumentsRequest());
  };

  const setSelectedDocument = (param?: IDocumentResponse) => dispatch(actions.setSelectedDocument(param));
  const setIsOpenModal = (param: ISetIsOpenModalPayload) => dispatch(actions.setIsOpenModal(param));

  return {myDocuments, favoriteDocuments, ...rest, get, setSelectedDocument, setIsOpenModal, getDocumentByList};
}
