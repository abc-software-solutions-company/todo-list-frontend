import classNames from 'classnames';
import {useRouter} from 'next/router';
import {FC, useState} from 'react';

import Tool, {IToolProps} from '@/components/list-detail/toolbar/tool';
import ToolMenu from '@/components/list-detail/toolbar/tool-menu';
import ModalDelete from '@/components/modal/modal-delete';
import ModalShare from '@/components/modal/modal-share';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import {socketUpdateList} from '@/data/socket';
import {IBaseProps} from '@/types';
import {MUI_ICON} from '@/utils/mui-icon';

import useTask from '../hooks/use-task';
import style from './style.module.scss';

const TaskToolbar: FC<IBaseProps> = ({className}) => {
  const {task} = useTask();
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

  const deleteToolProps: IToolProps = {
    icon: <Icon name="ico-trash-2" />,
    text: 'Delete',
    hidden: false,
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

  return (
    <div className={classNames(style.toolbar, className)}>
      <div className="header">
        <div className="left">
          <h2 className="text-h2"> {task.name}</h2>
        </div>
        <div className="right">
          <div className="toolbar-desktop">
            <Button onClick={onDelete}>
              <Icon name="ico-trash-2" size={20} />
              <span> Delete</span>
            </Button>
            <Button onClick={onShare}>
              <Icon name="ico-share-3" size={20} />
              <span> Share </span>
            </Button>
          </div>
          <div className="toolbar-mobile">
            <ToolMenu items={toolMenuItems} icon={<MUI_ICON.MORE_VERT />} margin={-1} />
          </div>
        </div>
      </div>
      <ModalDelete
        open={deleteModal}
        onClose={onClose}
        data={task}
        onSuccess={() => {
          socketUpdateList();
          router.back();
        }}
      />
      <ModalShare open={shareModal} onClose={onClose} data={task} />
    </div>
  );
};
export default TaskToolbar;
