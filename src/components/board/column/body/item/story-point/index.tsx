import React from 'react';

interface IKanbanTaskStoryPoint {
  point: number;
}

export default function KanbanTaskStoryPoint({point}: IKanbanTaskStoryPoint) {
  return (
    <div className="kanban-task-story-point">
      <div className="box rounded-[4px] bg-slate-100 py-0.5 px-2">{point}</div>
    </div>
  );
}
