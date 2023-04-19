import React, {FC, memo} from 'react';

import Icon from '@/core-ui/icon';

import style from './style.module.scss';

interface IKanbanTaskDuoDate {
  date?: Date;
}

const KanbanTaskDuoDate: FC<IKanbanTaskDuoDate> = ({date}) => {
  if (!date) return null;
  const duoDate = new Date(date);
  const month = duoDate.toLocaleString('default', {month: 'long'});
  const day = duoDate.getDay().toString();

  return (
    <div className={style['kanban-task-duo-date']}>
      <Icon name="ico-clock" size={16} className="btn-created-date" />
      <div className="date">{`${month} ${day}`}</div>
    </div>
  );
};

export default memo(KanbanTaskDuoDate);
