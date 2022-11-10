import classNames from 'classnames';
import {FC} from 'react';

import {IBaseProps} from '@/types';

import BodyLeft from './body-left';
import BodyRight from './body-right';
import style from './style.module.scss';

const TaskBody: FC<IBaseProps> = ({className}) => {
  return (
    <div className={classNames(style['task-body'], className)}>
      <BodyLeft className="body-left-wrapper" />
      <BodyRight className="body-right-wrapper" />
    </div>
  );
};

export default TaskBody;
