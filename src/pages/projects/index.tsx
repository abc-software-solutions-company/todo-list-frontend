import {Clock, SlidersHorizontal} from 'lucide-react';
import React, {useEffect, useState} from 'react';

import NewLayout from '@/layouts/new-layout';
import useLists from '@/states/lists/use-lists';

import TaskCard, {ITaskCard} from './project/project-card';

export default function ProjectsPage() {
  const {myList, get} = useLists();
  const [recentProjects, setRecentProjects] = useState<ITaskCard[]>([]);
  const [myProjects, setMyProjects] = useState<ITaskCard[]>([]);

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    const recentlyViewed = myList.slice(-3);
    setRecentProjects(
      recentlyViewed.map(value => ({
        title: value.name,
        dueDate: 'March 30,2023',
        completedTaskCount: 15,
        totalTaskCount: 20,
        bgColor: 'bg-gray-300'
      }))
    );
  }, [myList]);

  useEffect(() => {
    setMyProjects(
      myList.map(value => ({
        title: value.name,
        dueDate: 'March 30,2023',
        completedTaskCount: 15,
        totalTaskCount: 20,
        bgColor: 'bg-blue-300'
      }))
    );
  }, [myList]);

  return (
    <>
      <div className="mt-8 mb-4 flex items-center font-bold">
        <Clock size={20} className="mr-2" /> Recently viewed
      </div>
      <div className="grid grid-cols-3 gap-[24px]">
        {recentProjects.map((task, index) => (
          <TaskCard
            key={index}
            title={task.title}
            dueDate={'March 30,2023'}
            completedTaskCount={12}
            totalTaskCount={30}
            bgColor="bg-gray-300"
          />
        ))}
      </div>
      <div className="flex justify-between">
        <div className="mt-8 mb-4 font-bold">My project</div>
        <button className="flex items-center text-sm font-semibold">
          <SlidersHorizontal size={19} className="mr-2" /> Sell all
        </button>
      </div>
      <div className="grid grid-cols-3 gap-[24px]">
        {myProjects.map((task, index) => (
          <TaskCard
            key={index}
            title={task.title}
            dueDate={task.dueDate}
            completedTaskCount={task.completedTaskCount}
            totalTaskCount={task.totalTaskCount}
            bgColor={task.bgColor}
          />
        ))}
      </div>
    </>
  );
}

ProjectsPage.Layout = NewLayout;
