import React from 'react';

import Tool, {IToolProps} from '@/components/lists-detail/toolbar/tool';
import ToolMenu from '@/components/lists-detail/toolbar/tool-menu';
import Icon from '@/core-ui/icon';
import {ITaskResponse} from '@/data/api/types/task.type';
import useModals from '@/states/modals/use-modals';
import {MUI_ICON} from '@/utils/mui-icon';

interface IKanbanTaskEditDelete {
  task: ITaskResponse;
}

export default function KanbanTaskEditDelete({task}: IKanbanTaskEditDelete) {
  const {setIsOpenModal, setSelectedTask} = useModals();

  const onDelete = () => {
    setSelectedTask(task);
    setIsOpenModal('deleteTask');
  };

  const onEdit = () => {
    setSelectedTask(task);
    setIsOpenModal('updateTask');
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
    <div className="kanban-task-edit-delete">
      <ToolMenu display="alway" icon={<MUI_ICON.MORE_VERT />} items={toolMenuItems} margin={-1} />
    </div>
  );
}
