import { create } from 'zustand'
import { ITaskResponse } from '@/data/api/types/task.type';
import api from '@/data/api';

type State = {
    tasks: ITaskResponse[]
};

type Actions = {
    search: (name: string) => void,
};

const initialState: State = { tasks: [] };

export const useTasksSearch = create<State & Actions>()(
    (set, get) => ({
        ...initialState,
        search: async (name: string) => {
            try {
                const { data } = await api.task.search(name);
                console.log("🚀🚀🚀 -> search: -> data:::", {name,data});
                set({ tasks: data });
            } catch (error) {
                console.log('Search tasks err:::', error);
            }
        },
    })
);