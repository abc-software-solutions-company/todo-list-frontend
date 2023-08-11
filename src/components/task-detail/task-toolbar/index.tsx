import classNames from 'classnames';
import {FC} from 'react';

import {IBaseProps} from '@/types';

import Left from './left';
import Right from './right';
import style from './style.module.scss';

const TaskToolbar: FC<IBaseProps> = ({className}) => {
  return (
    <div className={classNames(style.toolbar, className)}>
      <div className="header">
        <Left className="left" />
        <Right className="right" />
      </div>
    </div>
  );
};
export default TaskToolbar;
