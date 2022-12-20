import React from 'react';

import Icon from '@/core-ui/icon';

interface IKanbanColumnFooter {
  onAddTask?: () => void;
}

export default function KanbanColumnFooter({onAddTask}: IKanbanColumnFooter) {
  return (
    <div className="kanban-column-footer">
      <Icon name="ico-plus-circle" className="flex justify-center hover:cursor-pointer" onClick={onAddTask} />
    </div>
  );
}
