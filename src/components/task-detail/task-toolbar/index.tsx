import {SelectChangeEvent} from '@mui/material';
import classNames from 'classnames';
import {FC, useState} from 'react';

import Status from '@/components/list-detail/status';
import ModalDelete from '@/components/modal/modal-delete';
import ModalShare from '@/components/modal/modal-share';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {socketUpdateList} from '@/data/socket';

import style from './style.module.scss';

interface ITaskToolbarProps {
  className?: string;
  taskData: ITaskResponse;
  updateTaskData: () => void;
}

const TaskToolbar: FC<ITaskToolbarProps> = ({taskData, updateTaskData, className}) => {
  const [deleteModal, setDeleteModel] = useState(false);
  const [shareModal, setShareModel] = useState(false);

  const onDelete = () => {
    setDeleteModel(true);
  };

  const onShare = () => {
    setShareModel(true);
  };

  const onClose = () => {
    setShareModel(false);
    setDeleteModel(false);
  };

  const onChangeStatus = (event: SelectChangeEvent<unknown>) => {
    api.task
      .update({id: taskData.id, statusId: Number(event.target.value)})
      .then(updateTaskData)
      .then(socketUpdateList)
      .catch(() => {});
  };

  return (
    <div className={classNames(style.toolbar, className)}>
      <div className="header">
        <div className="left">
          <Icon name="ico-task" size={32} />
          <h2 className="text-h2"> {taskData.name}</h2>
        </div>
        <div className="right">
          <Button onClick={onDelete}>
            <Icon name="ico-trash-2" />
            <span> Delete Task</span>
          </Button>
          <Button onClick={onShare}>
            <Icon name="ico-share-3" />
            <span> Share </span>
          </Button>
        </div>
      </div>
      <div className="info-status">
        <span>In the </span>
        <Status className={style.status} status={taskData.status} items={taskData.todoList.status} onChange={onChangeStatus} />
        <span> list</span>
      </div>
      <ModalDelete open={deleteModal} onClose={onClose} data={taskData} onSuccess={socketUpdateList} />
      <ModalShare open={shareModal} onClose={onClose} data={taskData} />
    </div>
  );
};
export default TaskToolbar;
