export const activityType = {
    projects: false,
    tasks: false,
    works: false
};

export type ISetActivity = keyof typeof activityType | null;