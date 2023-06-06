import {FC} from 'react';

import TaskDetail from '@/components/task-detail';
import {Modal} from '@/core-ui/modal';
import {useModalTaskDetailState} from '@/hooks/useModalTaskDetail';

const ModalTaskDetail: FC = () => {
  const modalTaskDetailState = useModalTaskDetailState();
  if (!modalTaskDetailState.task) return null;
  return (
    <Modal
      open={Boolean(modalTaskDetailState.task)}
      onClose={() => modalTaskDetailState.resetState()}
      className="w-fit max-w-[90%]"
    >
      <TaskDetail task={modalTaskDetailState.task} className="p-4" />
    </Modal>
  );
};

export default ModalTaskDetail;
