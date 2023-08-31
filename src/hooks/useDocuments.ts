import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import api from '@/data/api';
import {IDocumentAttribute, IDocumentCreate, IUpdateDocument} from '@/data/api/types/documents.type';
import {IStateInit} from '@/types';

interface State extends IStateInit {
  currentDocument: IDocumentAttribute;
  documents: IDocumentAttribute[];
  documentsFavorite: IDocumentAttribute[];
}

type Action = {
  initState: () => void;
  getDocument: (id: string) => void;
  resetDocumentsFavorite: () => void;
  getDocuments: (listId: string) => void;
  updateDocument: (data: IUpdateDocument) => void;
  deleteDoument: (data: IUpdateDocument) => void;
  createDocument: (data: IDocumentCreate) => void;
  addFavoriteDocument: (id: string) => void;
  removeFavoriteDocument: (id: string) => void;
  getDocumentsFavorite: (listId: string) => void;
};

export const useDocumentsStore = create<State & Action>()(
  devtools(
    immer(set => ({
      currentDocument: {} as IDocumentAttribute,
      documents: [],
      documentsFavorite: [],
      initState: () => {
        set({currentDocument: undefined, documents: [], documentsFavorite: []}, false, 'initState');
      },
      getDocuments: async listId => {
        try {
          set({isFeching: true}, false, 'Documents/GetDocuments');
          const res = await api.documents.getListDocument(listId);
          set(
            state => {
              state.documents = res.data;
              state.isFeching = false;
              if (!state.currentDocument?.id) state.currentDocument = state.documents?.[0];
            },
            false,
            'documents/getAllDocument'
          );
        } catch (error) {
          set({error: true, isFeching: false}, false, 'documents/error');
        }
      },
      getDocumentsFavorite: async listId => {
        try {
          set({isFeching: true}, false, 'Documents/GetDocumentsFavorite');
          const res = await api.documents.getDocumentsFavorite(listId);
          set(
            state => {
              state.documentsFavorite = res.data;
              state.isFeching = false;
            },
            false,
            'documents/GetDocumentsFavoriteSuccess'
          );
        } catch (error) {
          set({error: true, isFeching: false}, false, 'documents/erGetDocumentsFavoritError');
        }
      },
      getDocument: async id => {
        try {
          set({isFeching: true}, false, 'Documents/GetDocument');
          const res = await api.documents.getOneDocument(id);
          set({currentDocument: res.data, isFeching: false}, false, 'documents/getOneDocument');
        } catch (error) {
          set({isFeching: false, error: true}, false, 'documents/error');
        }
      },
      createDocument: async data => {
        try {
          set({isCreating: true}, false, 'Documents/CreateDocument');
          const res = await api.documents.create(data);
          set(
            state => {
              state.currentDocument = res.data;
              state.isCreating = false;
            },
            false,
            'documents/createDocumentSucces'
          );
        } catch (error) {
          set(
            state => {
              state.error = true;
              state.isCreating = false;
            },
            false,
            'documents/createDocumentError'
          );
        }
      },
      updateDocument: async data => {
        try {
          set({isUpdating: true}, false, 'Documents/GetDocument');
          const res = await api.documents.updateDocument(data);
          set({currentDocument: res.data, isUpdating: false}, false, 'documents/updateDocument');
        } catch (error) {
          set({error: true, isUpdating: false}, false, 'documents/updateError');
        }
      },
      deleteDoument: async data => {
        try {
          set({isDeleting: true}, false, 'Documents/GetDocument');
          await api.documents.updateDocument(data);
          set({currentDocument: undefined, isDeleting: false}, false, 'documents/updateDocument');
        } catch (error) {
          set({error: true, isDeleting: false}, false, 'documents/updateError');
        }
      },
      addFavoriteDocument: async id => {
        try {
          set({isUpdating: true}, false, 'Documents/addAndRemoveDocument');
          await api.documents.handleFavorite(id);
          set(
            state => {
              state.isUpdating = false;
              state.documentsFavorite = [state.currentDocument, ...state.documentsFavorite];
            },
            false,
            'documents/addAndRemoveDocument'
          );
        } catch (error) {
          set({error: true, isUpdating: false}, false, 'documents/addAndRemoveDocument');
        }
      },
      removeFavoriteDocument: async id => {
        try {
          set({isUpdating: true}, false, 'Documents/addAndRemoveDocument');
          await api.documents.handleFavorite(id);
          set(
            state => {
              state.isUpdating = false;
              state.documentsFavorite = state.documentsFavorite.filter(item => item.id !== id);
            },
            false,
            'documents/addAndRemoveDocument'
          );
        } catch (error) {
          set({error: true, isUpdating: false}, false, 'documents/addAndRemoveDocument');
        }
      },
      resetDocumentsFavorite: () => {
        set({documentsFavorite: []});
      }
    }))
  )
);
