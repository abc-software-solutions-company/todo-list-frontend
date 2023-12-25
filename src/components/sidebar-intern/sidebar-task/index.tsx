import React from 'react'
import SidebarTaskItem from './task-items'
import { ITaskResponse } from '@/data/api/types/task.type'

interface ISidebarTasks {
    tasks: ITaskResponse[]
}


function SidebarTasks({ tasks }: ISidebarTasks) {
  return (
    <>
        {
            tasks.map((task, index) => (
                <SidebarTaskItem key={index} name={task.name} color='red' />    
            ))
        }
    </>
  )
}

export default SidebarTasks