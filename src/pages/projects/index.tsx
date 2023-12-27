import {Clock, SlidersHorizontal} from 'lucide-react';
import React from 'react';
import TaskCard from './project/project-card';
import NewLayout from '@/layouts/new-layout';

import TaskCard from './project/project-card';

export default function ProjectsPage() {
  const testData = [
    {title: 'Task 1', dueDate: 'March 30,2023', completedTaskCount: 15, totalTaskCount: 20},
    {title: 'Task 2', dueDate: 'April 15,2023', completedTaskCount: 10, totalTaskCount: 15},
    {title: 'Task 2', dueDate: 'April 15,2023', completedTaskCount: 10, totalTaskCount: 15},
    {title: 'Task 2', dueDate: 'April 15,2023', completedTaskCount: 10, totalTaskCount: 15},
    {title: 'Task 2', dueDate: 'April 15,2023', completedTaskCount: 10, totalTaskCount: 15},
    {title: 'Task 3', dueDate: 'May 1,2023', completedTaskCount: 5, totalTaskCount: 10}
  ];

  return (
    <>
      <div className="mt-8 mb-4 flex items-center font-bold">
        <Clock size={20} className="mr-2" /> Recently viewed
      </div>
      <div className="grid grid-cols-3 gap-[24px]">
        {testData.map((task, index) => (
          <TaskCard
            key={index}
            title={task.title}
            dueDate={task.dueDate}
            completedTaskCount={task.completedTaskCount}
            totalTaskCount={task.totalTaskCount}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <div className="mt-8 mb-4 font-bold">My project</div>
        <button className="flex items-center text-sm font-semibold">
          <SlidersHorizontal size={19} className="mr-2" /> Sell all
        </button>
      </div>

      {testData.map((task, index) => (
        <TaskCard
          key={index}
          title={task.title}
          dueDate={task.dueDate}
          completedTaskCount={task.completedTaskCount}
          totalTaskCount={task.totalTaskCount}
        />
      ))}
    </>
  );
}

ProjectsPage.Layout = NewLayout;
