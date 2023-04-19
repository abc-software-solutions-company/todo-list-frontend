import React, {FC, memo} from 'react';

interface IKanbanTaskStoryPoint {
  point: string;
}

const KanbanTaskStoryPoint: FC<IKanbanTaskStoryPoint> = ({point}) => {
  if (!point) return null;
  return (
    <div className="kanban-task-story-point">
      <div className="box rounded-[4px] bg-slate-100 py-0.5 px-2">{point}</div>
    </div>
  );
};

export default memo(KanbanTaskStoryPoint);
