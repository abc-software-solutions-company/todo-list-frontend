import SidebarTasks from '../sidebar-task';
import AccordionIntern from '@/components/common/accordion-intern';
import useLists from '@/states/lists/use-lists';
import useTasks from '@/states/tasks/use-tasks';
import {useEffect} from 'react';

export default function SidebarMyProjects() {
  // const {myTasks, get} = useLists();
  const {myTasks, getMyTasks} = useTasks();

  useEffect(() => {
    getMyTasks();
  }, []);

  return (
    <>
      {myTasks?.length &&
        myTasks.map(list => (
          // <AccordionIntern key={list.id} name={list.name}>
          <SidebarTasks tasks={list.tasks} />
          // </AccordionIntern>
        ))}
    </>
  );
}
