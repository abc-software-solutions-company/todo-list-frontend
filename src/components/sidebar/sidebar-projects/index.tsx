import SidebarTasks from '@/components/sidebar-intern/sidebar-task';
import SidebarProjectItem from '@/components/sidebar/sidebar-projects/sidebar-project';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import useLists from '@/states/lists/use-lists';
import React, {CSSProperties, FC, useEffect} from 'react';

interface ISidebarProjectsProps {
  className?: string;
}

const SidebarProjects: FC<ISidebarProjectsProps> = ({className}) => {
  const {myList, get} = useLists();

  useEffect(() => {
    get();
  }, []);

  return (
    <div className={`{className}`}>
      {myList.map((project, index) => (
        <SidebarProjectItem key={index} id={project.id} name={project.name} />
      ))}
    </div>
  );
};

export default SidebarProjects;
