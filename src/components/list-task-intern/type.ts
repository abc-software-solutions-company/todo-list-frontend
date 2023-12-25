export const taskType = {
    today: false,
    doing: false,
    complete: false
};

export type ISetTaskType = keyof typeof taskType | null;