import classNames from 'classnames';
import {FC} from 'react';

import Upload from '@/components/task-detail/task-body/body-left/attachment/upload';
import Icon from '@/core-ui/icon';

import Title from '../../title';
import {IBodyLeftProps} from '..';
import TaskImages from './images';
import style from './style.module.scss';

const Attachments: FC<IBodyLeftProps> = props => {
  const {taskData, onSuccess, className} = props;

  const attachments = taskData.attachments.filter(e => e.isActive);

  return (
    <div className={classNames('attachment', className, style.attachment)}>
      <Title icon={<Icon name="ico-paperclip" />} text="Attachments" />
      <TaskImages className="task-images" {...{attachments, taskData, onSuccess}} />
      <Upload className={style.upload} {...{taskData, onSuccess}} />
    </div>
  );
};
export default Attachments;
