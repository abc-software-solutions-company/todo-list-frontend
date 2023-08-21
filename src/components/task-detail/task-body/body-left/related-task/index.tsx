import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import classNames from 'classnames';
import {useRouter} from 'next/router';
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
  const router = useRouter();
  const toast = useToast();
  const {task, update} = useTask();
  const useModalTaskDetail = useModalTaskDetailState();
  const [isEditing, setIsEditing] = useState(false);
  const [relatedIds, setRelatedIds] = useState<string[]>([]);
  const [ortherTasks, setOrtherTasks] = useState<ITaskResponse[]>([]);

  const handleOpenRelatedTask = (relatedTask: ITaskResponse) => {
    if (useModalTaskDetail.task) {
      useModalTaskDetail.setState(relatedTask);
    } else {
      router.push(`${ROUTES.TASK}/${relatedTask.id}`);
    }
  };

  const handleAddRelatedTask = () => {
    api.task
      .update({id: task.id, relatedIds: relatedIds})
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
            getOptionLabel={option => `${option.order}-${option.name}`}
            renderInput={params => <TextField {...params} label="Add sub task" />}
            onChange={(e, value) => {
              if (value) {
                setRelatedIds([...relatedIds, value.id]);
              }
            }}
          />
          <Icon name="ico-plus-circle" onClick={handleAddRelatedTask} className="cursor-pointer" />
        </div>
      )}
      {task.relatedTasks.map(item => (
        <TaskItem
          key={item.id}
          task={item}
          todolist={item.todolist}
          className="!mt-2 !rounded !bg-inherit !p-2 hover:!bg-blue-100"
          onClick={() => handleOpenRelatedTask(item)}
        />
      ))}
    </div>
  );
};
export default RelatedTask;
