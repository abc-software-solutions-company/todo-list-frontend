import {SelectChangeEvent} from '@mui/material';
import classNames from 'classnames';
import {useRouter} from 'next/router';
import {FC, useEffect, useState} from 'react';

import StatusSelect from '@/components/common/statusSelect';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import api from '@/data/api';
import {socketUpdateList} from '@/data/socket';
import useTodolist from '@/states/todolist/use-todolist';
import {MUI_ICON} from '@/utils/mui-icon';

import Tool, {IToolProps} from '../../toolbar/tool';
import ToolMenu from '../../toolbar/tool-menu';
import {ITaskItemProps} from '..';
import style from './style.module.scss';

const Actions: FC<ITaskItemProps> = ({task}) => {
  const {todolist, write, setIsOpenModal, setSelectedTask} = useTodolist();
  const [statusId, setStatusId] = useState(task.statusId);

  useEffect(() => {
    setStatusId(task.statusId);
  }, [task.statusId]);

  const router = useRouter();

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

  const onDetail = (taskId: string) => router.push(ROUTES.TASK + '/' + taskId);

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

  const detailToolProps: IToolProps = {
    icon: <Icon name="ico-chevron-right" />,
    onClick: () => onDetail(task.id)
  };

  const toolMenuItems = [deleteToolProps, editToolProps]
    .filter(item => !item.hidden)
    .map((item, idx) => <Tool key={idx} {...{...item, className: 'flex-row-reverse'}} />);

  return (
    <div className={classNames('actions', style.actions)}>
      <StatusSelect className="status" id={statusId} list={todolist.status} readonly={!write} onChange={onChange} />
      {write && (
        <>
          <Tool {...editToolProps} className="tool-desktop" />
          <Tool {...deleteToolProps} className="tool-desktop" />
          <Tool {...detailToolProps} className="w-3" />
          <ToolMenu icon={<MUI_ICON.MORE_VERT />} items={toolMenuItems} margin={-1} />
        </>
      )}
    </div>
  );
};

export default Actions;
