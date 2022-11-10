import classNames from 'classnames';
import {FC} from 'react';

import Upload from '@/components/task-detail/task-body/body-left/attachment/upload';
import Icon from '@/core-ui/icon';
import {IBaseProps} from '@/types';

import Title from '../../title';
import TaskImages from './images';
import style from './style.module.scss';

const Attachments: FC<IBaseProps> = ({className}) => {
  return (
    <div className={classNames('attachment', className, style.attachment)}>
      <Title icon={<Icon name="ico-paperclip" />} text="Attachments" />
      <TaskImages className="task-images" />
      <Upload className={style.upload} />
    </div>
  );
};

export default Attachments;
