import {useRouter} from 'next/router';
import {FC, useState} from 'react';

import Tool, {IToolProps} from '@/components/lists-detail/toolbar/tool';
import ToolMenu from '@/components/lists-detail/toolbar/tool-menu';
import ModalDelete from '@/components/modal/modal-delete';
import ModalShare from '@/components/modal/modal-share';
import Icon from '@/core-ui/icon';
import {socketUpdateList} from '@/data/socket';
import {IBaseProps} from '@/types';
import {MUI_ICON} from '@/utils/mui-icon';

import useTask from '../../../../states/task/use-task';

const Right: FC<IBaseProps> = ({className}) => {
  const router = useRouter();
  const {task, write} = useTask();
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

  const onDeleteSuccess = () => {
    socketUpdateList();
    router.back();
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
        <ToolMenu items={toolMenuItems} icon={<MUI_ICON.MORE_VERT />} />
      </div>
      <ModalDelete open={deleteModal} onClose={onClose} data={task} onSuccess={onDeleteSuccess} />
      <ModalShare open={shareModal} onClose={onClose} data={task} />
    </div>
  );
};

export default Right;
