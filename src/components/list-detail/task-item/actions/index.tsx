import {SelectChangeEvent} from '@mui/material';
import classNames from 'classnames';
import {useRouter} from 'next/router';
import {FC} from 'react';

import StatusSelect from '@/components/common/statusSelect';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import api from '@/data/api';
import {socketUpdateList} from '@/data/socket';
import {MUI_ICON} from '@/utils/mui-icon';

import Tool, {IToolProps} from '../../toolbar/tool';
import ToolMenu from '../../toolbar/tool-menu';
import {ITaskItemProps} from '..';
import style from './style.module.scss';

const Actions: FC<ITaskItemProps> = ({task, onEdit, onDelete, statusList, readonly}) => {
  const router = useRouter();

  const statusValue = statusList.filter(e => e.id === task.statusId)[0];

  const onChange = (event: SelectChangeEvent<unknown>) => {
    api.task
      .update({id: task.id, statusId: Number(event.target.value)})
      .then(socketUpdateList)
      .catch(() => {});
  };

  const onDetail = (taskId: string) => {
    router.push(ROUTES.TASK + '/' + taskId);
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

  const detailToolProps: IToolProps = {
    icon: <Icon name="ico-chevron-right" />,
    onClick: () => onDetail(task.id)
  };

  const toolMenuItems = [deleteToolProps, editToolProps]
    .filter(item => !item.hidden)
    .map((item, idx) => <Tool key={idx} {...{...item, className: 'flex-row-reverse'}} />);

  return (
    <div className={classNames('actions', style.actions)}>
      {statusList && <StatusSelect className="status" items={statusList} readOnly={readonly} status={statusValue} onChange={onChange} />}
      {!readonly && (
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
