import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import classNames from 'classnames';
import {FC, useEffect, useState} from 'react';

import TaskItem from '@/components/common/task-item';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {useModalTaskDetailState} from '@/hooks/useModalTaskDetail';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';
import {ToastContents} from '@/utils/toast-content';

import Title from '../../title';

type IRelatedTaskProps = IBaseProps;

const RelatedTask: FC<IRelatedTaskProps> = ({className}) => {
  const toast = useToast();
  const {task, update} = useTask();
  const useModalTaskDetail = useModalTaskDetailState();
  const [isEditing, setIsEditing] = useState(false);
  const [ortherTasks, setOrtherTasks] = useState<ITaskResponse[]>([]);
  const [relatedId, setRelatedId] = useState<string>('');

  const relatedIds = task.relatedTasks.map(x => x.id);

  const handleOpenRelatedTask = (relatedTask: ITaskResponse) => {
    if (useModalTaskDetail.task) {
      useModalTaskDetail.setState(relatedTask);
    } else {
      window.open(`${ROUTES.TASK}/${relatedTask.id}`, '_blank');
    }
  };

  const handleAddRelatedTask = (relatedTaskId: string) => {
    api.task
      .update({id: task.id, relatedIds: [...relatedIds, relatedTaskId]})
      .then(update)
      .catch(() => toast.show({type: 'danger', title: 'Related task', content: ToastContents.ERROR}));
  };

  const handleRemoveRelatedTask = (relatedTaskId: string) => {
    const newRelatedTaskIds = relatedIds.filter(x => x !== relatedTaskId);
    api.task
      .update({id: task.id, relatedIds: newRelatedTaskIds})
      .then(update)
      .catch(() => toast.show({type: 'danger', title: 'Related task', content: ToastContents.ERROR}));
  };

  useEffect(() => {
    api.task
      .findOrtherTaks(task.id, task.todolist.id)
      .then(res => setOrtherTasks(res.data))
      .catch(() => toast.show({type: 'danger', title: 'Related task', content: ToastContents.ERROR}));
  }, [task]);

  return (
    <div className={classNames('description', className)}>
      <Title
        icon={<Icon name="ico-link-horizontal" />}
        text="Related task"
        rightBtn={
          <Button
            text={!isEditing ? 'Add' : 'Cancel'}
            className="rounded bg-slate-100 p-1 text-h7"
            onClick={() => setIsEditing(!isEditing)}
          />
        }
      />
      {isEditing && (
        <div className="flex items-center space-x-2">
          <Autocomplete
            disablePortal
            options={ortherTasks}
            sx={{width: 1}}
            getOptionLabel={({order, name}) => `${task.todolist.taskSymbol} ${order}-${name}`}
            renderInput={params => <TextField {...params} label="Add related task" />}
            onChange={(_e, value) => {
              if (value) {
                setRelatedId(value.id);
              }
            }}
          />
          <Icon name="ico-plus-circle" className="cursor-pointer" onClick={() => handleAddRelatedTask(relatedId)} />
        </div>
      )}
      {task.relatedTasks.map(item => (
        <div key={item.id} className="flex items-center space-x-2">
          <TaskItem
            task={item}
            todolist={item.todolist}
            className="!mt-2 !rounded !border-t !bg-inherit !px-2 !py-1 hover:!bg-blue-100"
            onClick={() => handleOpenRelatedTask(item)}
          />
          <Icon name="ico-times" className="cursor-pointer" onClick={() => handleRemoveRelatedTask(item.id)} />
        </div>
      ))}
    </div>
  );
};
export default RelatedTask;
