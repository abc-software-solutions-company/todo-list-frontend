import classNames from 'classnames';
import {FC, HTMLAttributes, ReactNode} from 'react';

import Icon from '@/core-ui/icon';
import {IAssigneeResponse} from '@/data/api/types/task.type';
import {shortName} from '@/utils/function';

import style from './style.module.scss';

interface IAssigneeIconProps extends HTMLAttributes<HTMLDivElement> {
  data: IAssigneeResponse;
  bg?: string;
}

const AssigneeIcon: FC<IAssigneeIconProps> = ({data, bg = 'bg-slate-300', ...rest}) => {
  let name: ReactNode = <Icon name="ico-plus" size={16} />;
  if (data) {
    name = shortName(data.user.name);
  }
  return (
    <div {...rest} className={classNames(bg, style['assignee-icon'])}>
      {name}
    </div>
  );
};

export default AssigneeIcon;
