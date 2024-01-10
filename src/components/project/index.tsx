import ProjectCard, {IProjectCardProps} from '@/components/project/project-card/project-card';
import Icon from '@/core-ui/icon';
import useLists from '@/states/lists/use-lists';
import React, {CSSProperties, FC, useEffect, useState} from 'react';

interface IProjectProps {
  className?: string | undefined;
}

const Project: FC<IProjectProps> = ({className}) => {
  const {myList, get} = useLists();
  const [recentProjects, setRecentProjects] = useState<IProjectCardProps[]>([]);
  const [myProjects, setMyProjects] = useState<IProjectCardProps[]>([]);

  const membersData = [
    {name: 'Long Hoang'},
    {name: 'Khoa Nguyen'},
    {name: 'Anh Nguyen'},
    {name: 'Huy Ngo'},
    {name: 'Loi Huynh'},
    {name: 'Hung Le'},
    {name: 'Truc Duong'},
    {name: 'Gabimaru'}
  ];

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    const recentlyViewed = myList.slice(-3);
    setRecentProjects(
      recentlyViewed.map(value => ({
        title: value.name,
        dueDate: 'March 30,2023',
        completedTaskCount: 10,
        totalTaskCount: 20,
        bgColor: 'bg-gray-300',
        members: membersData
      }))
    );
  }, [myList]);

  useEffect(() => {
    setMyProjects(
      myList.map(value => ({
        title: value.name,
        dueDate: 'March 30,2023',
        completedTaskCount: 20,
        totalTaskCount: 20,
        bgColor: 'bg-blue-300',
        members: membersData
      }))
    );
  }, [myList]);

  return (
    <>
      <div className="mt-12 mb-8 flex w-full items-center font-bold">
        <Icon name="clock" className="ico-clock mr-2" size={20} />
        <p className="text-3xl">Recently Viewed</p>
      </div>
      <div className="grid w-full gap-[24px] sm:grid-cols-1 md:shrink-0 md:grid-cols-2 lg:grid-cols-3">
        {recentProjects.map((task, index) => (
          <ProjectCard
            key={index}
            title={task.title}
            dueDate={'March 30,2023'}
            completedTaskCount={task.completedTaskCount}
            totalTaskCount={task.totalTaskCount}
            bgColor="bg-gray-300"
            members={task.members}
          />
        ))}
      </div>
      <div className="mt-12 mb-8 flex w-full justify-between">
        <div className="font-bold">
          <p className="text-3xl">My project</p>
        </div>
        <button className="flex items-center text-sm font-semibold">
          <Icon name="sliders-horizontal" className="ico-sliders-horizontal" /> Sell all
        </button>
      </div>
      <div className="grid w-full gap-[24px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {myProjects.map((task, index) => (
          <ProjectCard
            key={index}
            title={task.title}
            dueDate={task.dueDate}
            completedTaskCount={task.completedTaskCount}
            totalTaskCount={task.totalTaskCount}
            bgColor={task.bgColor}
            members={task.members}
          />
        ))}
      </div>
    </>
  );
};

export default Project;
