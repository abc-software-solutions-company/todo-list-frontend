import {SelectChangeEvent} from '@mui/material';
import React from 'react';

import TaskPiority from '@/components/common/task-priority';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {socketUpdateList} from '@/data/socket';
import useTodolistKanban from '@/states/todolist/use-todolist';
import {ToastContents} from '@/utils/toast-content';

import style from './style.module.scss';

interface IKanbanTaskPriority {
  priority: string;
  taskId: string;
}

export default function KanbanTaskPriority({priority, taskId}: IKanbanTaskPriority) {
  const toast = useToast();

  const onChangePriority = (event: SelectChangeEvent<unknown>) => {
    api.task
      .update({id: taskId, priority: event.target.value as string})
      .then(socketUpdateList)
      .catch(() => toast.show({type: 'danger', title: 'Priority', content: ToastContents.ERROR}));
  };
  const {write} = useTodolistKanban();
  return (
    <div className={style['kanban-task-priority']}>
      <TaskPiority
        priority={priority}
        readOnly={!write}
        hideTitle={true}
        onChange={onChangePriority}
        stylePriorityIcon={{height: '30px', width: '30px'}}
      />
    </div>
  );
}
