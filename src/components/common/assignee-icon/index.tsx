import classNames from 'classnames';
import {FC, HTMLAttributes, ReactNode} from 'react';

import Icon from '@/core-ui/icon';
import {shortName} from '@/utils/function';

import style from './style.module.scss';

interface IAssigneeIconProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  bg?: string;
}

const AssigneeIcon: FC<IAssigneeIconProps> = ({name, bg = 'bg-slate-300', ...rest}) => {
  return (
    <div {...rest} className={classNames(bg, style['assignee-icon'])}>
      {name ? shortName(name) : <Icon name="ico-plus" size={16} />}
    </div>
  );
};

export default AssigneeIcon;
