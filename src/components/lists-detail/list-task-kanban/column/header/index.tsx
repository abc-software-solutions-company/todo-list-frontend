import React from 'react';

import Icon from '@/core-ui/icon';

const onAddTask = () => {
  console.log('onAddTaskKanbanEvent');
};

interface IKanbanColumnHeader {
  name: string;
}
export default function KanbanColumnHeader({name}: IKanbanColumnHeader) {
  return (
    <>
      <h3 className="text-center">{name}</h3>
      <Icon name="ico-plus-circle" className="flex justify-center hover:cursor-pointer" onClick={onAddTask} />
    </>
  );
}
