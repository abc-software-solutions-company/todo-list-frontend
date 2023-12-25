import { ITaskResponse } from "@/data/api/types/task.type";

const separateTasksListByStatus = (tasks: ITaskResponse[]) => {
    const todoArr: ITaskResponse[] = [];
    const doingArr: ITaskResponse[] = [];
    const completeArr: ITaskResponse[] = [];

    if(tasks?.length > 0) {
        tasks?.map((task) => {
            task.statusname === 'To-Do' ? todoArr.push(task) 
            : task.statusname === 'In-Progress' ? doingArr.push(task)
            : task.statusname === 'Done' ? completeArr.push(task) : '';         
        })
    }

    return { todoArr, doingArr, completeArr };
}

export {
    separateTasksListByStatus
}