import {FC} from 'react';

import TaskDetail from '@/components/task-detail';
import Icon from '@/core-ui/icon';
import {Modal} from '@/core-ui/modal';
import {useModalTaskDetailState} from '@/hooks/useModalTaskDetail';

const ModalTaskDetail: FC = () => {
  const modalTaskDetailState = useModalTaskDetailState();

  const handleCloseModal = () => {
    modalTaskDetailState.resetState();
  };

  if (!modalTaskDetailState.task) return null;
  return (
    <Modal open={Boolean(modalTaskDetailState.task)} onClose={handleCloseModal} className="w-fit max-w-[90%]">
      <Icon name="ico-times" className="absolute right-2 top-1 cursor-pointer" onClick={handleCloseModal} />
      <TaskDetail task={modalTaskDetailState.task} className="p-4" />
    </Modal>
  );
};

export default ModalTaskDetail;
