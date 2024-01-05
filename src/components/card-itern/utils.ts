import { ITaskResponse } from "@/data/api/types/task.type";

const countNumberProjectDone = (tasks: ITaskResponse[] | undefined):number => {
    if (!tasks) return 0;
    const doneTasks = tasks.filter(task => task.isDone)
    return doneTasks?.length || 0;
}

const countTotalTasks = (tasks: ITaskResponse[] | undefined):number => {
    return tasks?.length || 0;
}

const calculatePercentage: ICaculatePercentage = ({ taskDone, taskTotal }) => {
    if (taskTotal === 0) {
        return 0;
    }
    return Math.floor((taskDone / taskTotal) * 100);
};

export {
    countNumberProjectDone,
    calculatePercentage,
    countTotalTasks
}