import React from 'react';

import Icon from '@/core-ui/icon';

import style from './style.module.scss';

interface IKanbanTaskCreatedDate {
  onChange?: () => void;
  date: Date;
}

export default function KanbanTaskCreatedDate({onChange, date}: IKanbanTaskCreatedDate) {
  console.log(date);

  const month = date.toLocaleString('default', {month: 'long'});
  const day = date.getDay().toString();
  return (
    <div className={style['kanban-task-created-date']}>
      <Icon name="ico-clock" size={16} className="btn-created-date" onClick={onChange} />
      <div className="date">{`${month} ${day}`}</div>
    </div>
  );
}
