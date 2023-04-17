import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';

type State = {
  ids: string[];
  entitiesColumn: {[key: string]: {ids: string[]; status: IStatus}};
  entitiesItem: {[key: string]: ITaskResponse};
};

type Action = {
  generateState: (param: IStatus[]) => void;
  updateState: (param: (entites: State) => void) => void;
  resetState: () => void;
};

const initialState: State = {ids: [], entitiesColumn: {}, entitiesItem: {}};

export const useBoardState = create<State & Action>()(
  immer(set => ({
    ...initialState,
    generateState: param => {
      const entitiesColumn: State['entitiesColumn'] = {};
      const entitiesItem: State['entitiesItem'] = {};
      const ids = [...param]
        .sort((a, b) => a.index - b.index)
        .map(status => {
          const key = String(status.id);
          entitiesColumn[key] = {
            ids: [...(status.tasks || [])]
              .sort((a, b) => a.indexColumn - b.indexColumn)
              .map(task => {
                entitiesItem[task.id] = task;
                return task.id;
              }),
            status
          };
          return key;
        });
      set({ids, entitiesColumn, entitiesItem});
    },
    updateState: param => set(state => param(state)),
    resetState: () => set(initialState)
  }))
);
