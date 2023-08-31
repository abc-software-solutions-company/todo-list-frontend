import {FC} from 'react';

import TaskDetail from '@/components/task-detail';
import Modal from '@/core-ui/modal';
import {useModalTaskDetailState} from '@/hooks/useModalTaskDetail';

const ModalTaskDetail: FC = () => {
  const modalTaskDetailState = useModalTaskDetailState();

  const handleCloseModal = () => {
    modalTaskDetailState.resetState();
  };

  if (!modalTaskDetailState.task) return null;

  return (
    <Modal open={Boolean(modalTaskDetailState.task)} onClose={handleCloseModal} className="max-w-[70%]">
      <TaskDetail task={modalTaskDetailState.task} className="p-4" />
    </Modal>
  );
};

export default ModalTaskDetail;
