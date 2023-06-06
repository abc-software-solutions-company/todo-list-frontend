import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {ITaskResponse} from '@/data/api/types/task.type';

type State = {task: ITaskResponse | null};

type Action = {
  setState: (task: ITaskResponse) => void;
  resetState: () => void;
};

const initialState: State = {task: null};

export const useModalTaskDetailState = create<State & Action>()(
  immer(set => ({
    ...initialState,
    setState: (task: ITaskResponse) => set({task}),
    resetState: () => set(initialState)
  }))
);
