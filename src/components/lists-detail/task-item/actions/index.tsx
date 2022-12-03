import {SelectChangeEvent} from '@mui/material';
import classNames from 'classnames';
import {FC, useEffect, useState} from 'react';

import StatusSelect from '@/components/common/statusSelect';
import TaskAssignee from '@/components/common/task-assignee';
import TaskPiority from '@/components/common/task-priority';
import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {socketUpdateList} from '@/data/socket';
import useTodolist from '@/states/todolist/use-todolist';
import {MUI_ICON} from '@/utils/mui-icon';
import {ToastContents} from '@/utils/toast-content';

import Tool, {IToolProps} from '../../toolbar/tool';
import ToolMenu from '../../toolbar/tool-menu';
import {ITaskItemProps} from '..';
import style from './style.module.scss';

const Actions: FC<ITaskItemProps> = ({task}) => {
  const {todolist, write, setIsOpenModal, setSelectedTask} = useTodolist();
  const toast = useToast();
  const [statusId, setStatusId] = useState(task.statusId);
  const assigneeList = todolist.members;

  useEffect(() => {
    setStatusId(task.statusId);
  }, [task.statusId]);

  const onDelete = () => {
    setSelectedTask(task);
    setIsOpenModal('delete');
  };

  const onEdit = () => {
    setSelectedTask(task);
    setIsOpenModal('task');
  };

  const onChange = (event: SelectChangeEvent<number>) => {
    const newStatusId = Number(event.target.value);
    setStatusId(newStatusId);
    api.task.update({id: task.id, statusId: newStatusId}).then(socketUpdateList);
  };

  const onChangePriority = (event: SelectChangeEvent<unknown>) => {
    api.task
      .update({id: task.id, priority: event.target.value as string})
      .then(socketUpdateList)
      .catch(() => toast.show({type: 'danger', title: 'Priority', content: ToastContents.ERROR}));
  };

  const deleteToolProps: IToolProps = {
    icon: <Icon name="ico-trash-2" />,
    text: 'Delete',
    onClick: onDelete
  };

  const editToolProps: IToolProps = {
    icon: <Icon name="ico-edit" />,
    text: 'Edit',
    onClick: onEdit
  };

  const toolMenuItems = [deleteToolProps, editToolProps]
    .filter(item => !item.hidden)
    .map((item, idx) => <Tool key={idx} {...{...item, className: 'flex-row-reverse'}} />);

  return (
    <div className={classNames('actions', style.actions)}>
      <StatusSelect className="status" id={statusId} list={todolist.status} readonly={!write} onChange={onChange} />
      <TaskAssignee
        {...{task, onSuccess: socketUpdateList, assigneeList}}
        readonly={write}
        sx={{position: 'absolute'}}
        hideIconWhenClick={false}
      />
      <div className="piority">
        <TaskPiority task={task} readOnly={!write} onChange={onChangePriority} hideTitle={true} />
      </div>
      {write && <ToolMenu display="alway" icon={<MUI_ICON.MORE_VERT />} items={toolMenuItems} margin={-1} />}
    </div>
  );
};

export default Actions;
