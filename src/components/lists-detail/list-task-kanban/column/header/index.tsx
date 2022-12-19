import React from 'react';

import Icon from '@/core-ui/icon';

const onAddTask = () => {
  console.log('onAddTaskKanbanEvent');
};
export default function KanbanColumnHeader() {
  return (
    <>
      <Icon name="ico-plus-circle" className="flex justify-center hover:cursor-pointer" onClick={onAddTask} />
    </>
  );
}
