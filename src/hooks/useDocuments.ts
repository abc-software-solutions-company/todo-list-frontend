import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import api from '@/data/api';
import {IDocumentAttribute, IDocumentCreate, IGetDocuments, IUpdateDocument} from '@/data/api/types/documents.type';

type State = {
  error: boolean;
  isFeching: boolean;
  document: IDocumentAttribute;
  documents: IGetDocuments[];
};

type Action = {
  getAllDocument: (keyword: string) => void;
  getDocument: (keyword: string) => void;
  updateDocument: (keyword: IUpdateDocument) => void;
  createDocument: (data: IDocumentCreate) => void;
  setDocument: (newContent: string) => void;
};

export const useDocumentsStore = create<State & Action>()(
  devtools(
    immer(set => ({
      documents: [],
      error: false,
      isFeching: false,
      document: {id: '', content: '', name: '', favorite: false, todolistId: '', parentId: ''},
      setDocument: newContent =>
        set(state => ({
          ...state,
          document: {
            ...state.document,
            content: newContent
          }
        })),
      getAllDocument: async id => {
        try {
          const res = await api.documents.getListDocument(id);
          set(
            state => {
              state.documents = res.data;
              state.isFeching = true;
            },
            false,
            'documents/getAllDocument'
          );
        } catch (error) {
          set(
            state => {
              state.isFeching = false;
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
              state.isFeching = false;
              state.error = true;
            },
            false,
            'documents/error'
          );
        }
      },
      createDocument: async data => {
        try {
          const res = await api.documents.create(data);
          set(
            state => {
              state.isFeching = false;
              state.document = res.data;
            },
            false,
            'documents/createDocumentSucces'
          );
        } catch (error) {
          set(
            state => {
              state.isFeching = false;
              state.error = true;
            },
            false,
            'documents/createDocumentError'
          );
        }
      },
      updateDocument: async data => {
        try {
          const res = await api.documents.updateDocument(data);
          set(
            state => {
              state.isFeching = false;
              state.document = res.data;
            },
            false,
            'documents/updateDocument'
          );
        } catch (error) {
          set(
            state => {
              state.isFeching = false;
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
