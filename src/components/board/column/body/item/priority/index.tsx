import React, {FC, memo} from 'react';

import Icon from '@/core-ui/icon';
import {PriorityColors, PriorityIcons} from '@/utils/constant';

import style from './style.module.scss';

interface IKanbanTaskPriorityProps {
  priority: string;
}

const KanbanTaskPriority: FC<IKanbanTaskPriorityProps> = ({priority}) => {
  const key = priority.toLowerCase() as keyof typeof PriorityIcons; //FIXME: priority = medium
  const iconName = PriorityIcons[key];

  return (
    <div className={style['kanban-task-priority']}>
      <Icon name={iconName} style={{color: PriorityColors[key]}} />
    </div>
  );
};

export default memo(KanbanTaskPriority);
