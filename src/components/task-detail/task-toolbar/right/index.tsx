import {FC} from 'react';

import Tool, {IToolProps} from '@/components/lists-detail/toolbar/tool';
import ToolMenu from '@/components/lists-detail/toolbar/tool-menu';
import Icon from '@/core-ui/icon';
import useModals from '@/states/modals/use-modals';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';
import {MUI_ICON} from '@/utils/mui-icon';

const Right: FC<IBaseProps> = ({className}) => {
  const {task, write} = useTask();
  const {setIsOpenModal, setSelectedTask} = useModals();

  const onDelete = () => {
    setIsOpenModal('deleteTask');
    setSelectedTask(task);
  };

  const onShare = () => {
    setIsOpenModal('shareTask');
    setSelectedTask(task);
  };

  const deleteToolProps: IToolProps = {
    icon: <Icon name="ico-trash-2" />,
    text: 'Delete',
    onClick: onDelete
  };

  const shareToolProps: IToolProps = {
    icon: <Icon name="ico-share-3" />,
    text: 'Share',
    onClick: onShare
  };

  const toolMenuItems = [deleteToolProps, shareToolProps]
    .filter(item => !item.hidden)
    .map((item, idx) => <Tool key={idx} {...{...item, className: 'flex-row-reverse'}} />);

  if (!write) return null;
  return (
    <div className={className}>
      <div className="toolbar-desktop">
        <Tool {...deleteToolProps} />
        <Tool {...shareToolProps} />
      </div>
      <div className="toolbar-mobile">
        <ToolMenu display="mobile" items={toolMenuItems} icon={<MUI_ICON.MORE_VERT />} />
      </div>
    </div>
  );
};

export default Right;
