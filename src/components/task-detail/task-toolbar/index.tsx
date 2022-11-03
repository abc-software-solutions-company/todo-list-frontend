import classNames from 'classnames';
import {useRouter} from 'next/router';
import {FC, useState} from 'react';

import ModalDelete from '@/components/modal/modal-delete';
import ModalShare from '@/components/modal/modal-share';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import {ITaskResponse} from '@/data/api/types/task.type';
import {socketUpdateList} from '@/data/socket';

import style from './style.module.scss';

interface ITaskToolbarProps {
  className?: string;
  taskData: ITaskResponse;
}

const TaskToolbar: FC<ITaskToolbarProps> = ({taskData, className}) => {
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

  const router = useRouter();

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
      <ModalDelete
        open={deleteModal}
        onClose={onClose}
        data={taskData}
        onSuccess={() => {
          socketUpdateList();
          router.back();
        }}
      />
      <ModalShare open={shareModal} onClose={onClose} data={taskData} />
    </div>
  );
};
export default TaskToolbar;
