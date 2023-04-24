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
  getAllDocument: (listId: string) => void;
  getDocument: (id: string) => void;
  updateDocument: (data: IUpdateDocument) => void;
  createDocument: (data: IDocumentCreate) => void;
  setContentDocument: (newContent: string) => void;
};

export const useDocumentsStore = create<State & Action>()(
  devtools(
    immer(set => ({
      documents: [],
      error: false,
      isFeching: false,
      document: {} as IDocumentAttribute,
      setContentDocument: newContent =>
        set(state => ({
          ...state,
          document: {
            ...state.document,
            content: newContent
          }
        })),
      getAllDocument: async listId => {
        try {
          const res = await api.documents.getListDocument(listId);
          set(
            state => {
              state.documents = res.data;
              state.isFeching = true;
              if (!state.document?.id) state.document = state.documents?.[0];
            },
            false,
            'documents/getAllDocument'
          );
        } catch (error) {
          set(
            state => {
              state.error = true;
              state.isFeching = false;
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
              state.document = res.data;
              state.isFeching = false;
            },
            false,
            'documents/createDocumentSucces'
          );
        } catch (error) {
          set(
            state => {
              state.error = true;
              state.isFeching = false;
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
              state.document = res.data;
              state.isFeching = false;
            },
            false,
            'documents/updateDocument'
          );
        } catch (error) {
          set(
            state => {
              state.error = true;
              state.isFeching = false;
            },
            false,
            'documents/error'
          );
        }
      }
    }))
  )
);
