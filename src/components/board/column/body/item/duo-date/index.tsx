import React, {FC, memo} from 'react';

import style from './style.module.scss';

interface IKanbanTaskDuoDate {
  date?: Date;
}

const KanbanTaskDuoDate: FC<IKanbanTaskDuoDate> = ({date}) => {
  if (!date) return null;
  const duoDate = new Date(date);
  const month = duoDate.toLocaleString('default', {month: 'short'});
  const day = duoDate.getDate();

  return (
    <div className={style['kanban-task-duo-date']}>
      <div className="date">{`${month} ${day}`}</div>
    </div>
  );
};

export default memo(KanbanTaskDuoDate);
