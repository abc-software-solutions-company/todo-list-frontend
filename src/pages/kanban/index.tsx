import dynamic from 'next/dynamic';
import React, {useEffect} from 'react';

import useTodolist from '@/states/todolist/use-todolist';

const Kanban = dynamic(() => import('@/components/common/kanban'), {
  ssr: false
});

export default function KanbanPage() {
  const {todolistKanban, getTodolist} = useTodolist();

  useEffect(() => {
    getTodolist('7wfr7');
  }, []);

  if (!todolistKanban) return null;

  if (todolistKanban)
    return (
      <div>
        Kanban Component, Send data via prop
        <Kanban data={todolistKanban} />
      </div>
    );
}
