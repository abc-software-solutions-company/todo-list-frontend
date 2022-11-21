import classNames from 'classnames';
import {FC, HTMLAttributes, ReactNode} from 'react';

import Icon from '@/core-ui/icon';
import {IAssigneeResponse} from '@/data/api/types/task.type';
import {JoinerBgColos} from '@/utils/constant';
import {shortName} from '@/utils/function';

import style from './style.module.scss';

interface IAssigneeIconProps extends HTMLAttributes<HTMLDivElement> {
  data: IAssigneeResponse[];
}

const AssigneeIcon: FC<IAssigneeIconProps> = ({data, ...rest}) => {
  if (!data) return null;
  let bg = 'bg-slate-300';
  let name: ReactNode = <Icon name="ico-plus" size={16} />;
  const assignee = data.filter(e => e.isActive)[0];
  if (assignee) {
    bg = JoinerBgColos[0];
    name = shortName(assignee.user.name);
  }
  return (
    <div {...rest} className={classNames(bg, style['assignee-icon'])}>
      {name}
    </div>
  );
};

export default AssigneeIcon;
