import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import api from '@/data/api';
import {IGetDocuments, IUpdateDocument} from '@/data/api/types/documents.type';

export interface IDocumentsStore {
  error: boolean;
  document: IGetDocuments;
  documents: IGetDocuments[];
  getAllDocument: (keyword: string) => void;
  getDocument: (keyword: string) => void;
  updateDocument: (keyword: IUpdateDocument) => void;
}

export const useDocumentsStore = create<IDocumentsStore>()(
  devtools(
    immer(set => ({
      documents: [],
      loading: true,
      error: false,
      document: {id: '', name: '', content: '', favorite: false, parentId: '', todolistId: '', children: []},
      getAllDocument: async id => {
        try {
          const res = await api.documents.getListDocument(id);
          set(
            state => {
              state.documents = res.data;
            },
            false,
            'documents/getAllDocument'
          );
        } catch (error) {
          set(
            state => {
              state.error = true;
            },
            false,
            'documents/error'
          );
        }
      },
      getDocument: async id => {
        try {
          const res = await api.documents.getOneDocument(id);
          set(
            state => {
              state.document = res.data;
            },
            false,
            'documents/getOneDocument'
          );
        } catch (error) {
          set(
            state => {
              state.error = true;
            },
            false,
            'documents/error'
          );
        }
      },
      updateDocument: async data => {
        try {
          const res = await api.documents.updateDocument(data);
          set(
            state => {
              state.document = res.data;
            },
            false,
            'documents/updateDocument'
          );
        } catch (error) {
          set(
            state => {
              state.error = true;
            },
            false,
            'documents/error'
          );
        }
      }
    }))
  )
);
