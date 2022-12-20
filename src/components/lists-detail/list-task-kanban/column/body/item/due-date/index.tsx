import React from 'react';

import Icon from '@/core-ui/icon';

import style from './style.module.scss';

interface IKanbanTaskDueDate {
  onChange?: () => void;
  date: Date;
}

export default function KanbanTaskDueDate({onChange, date}: IKanbanTaskDueDate) {
  const month = date.toLocaleString('default', {month: 'long'});
  const day = date.getDay().toString();
  return (
    <div className={style['kanban-task-due-date']}>
      <Icon name="ico-clock" className="btn-due-date" onClick={onChange} />
      <div className="date">{`${month} ${day}`}</div>
    </div>
  );
}
