import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {ITaskResponse} from '@/data/api/types/task.type';

type State = {
  task: ITaskResponse | null;
  parentTask?: ITaskResponse;
};

type Action = {
  setState: (task: ITaskResponse | null) => void;
  setParentTask: (parentTask: ITaskResponse) => void;
  resetState: () => void;
};

const initialState: State = {task: null, parentTask: undefined};

export const useModalTaskDetailState = create<State & Action>()(
  immer(set => ({
    ...initialState,
    setState: task => set({task}),
    setParentTask: parentTask => set({parentTask}),
    resetState: () => set(initialState)
  }))
);
