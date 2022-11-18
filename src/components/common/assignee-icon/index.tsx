import classNames from 'classnames';
import {FC, HTMLAttributes} from 'react';

import {IAssignee} from '@/data/api/types/task.type';
import {JoinerBgColos} from '@/utils/constant';
import {shortName} from '@/utils/function';

interface IAssigneeIconProps extends HTMLAttributes<HTMLDivElement> {
  data: IAssignee;
}

const AssigneeIcon: FC<IAssigneeIconProps> = ({data, ...rest}) => {
  if (!data) return null;
  const bg = JoinerBgColos[0];
  const name = shortName(data.name);
  return (
    <div {...rest} className={classNames(bg, 'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white')}>
      {name}
    </div>
  );
};

export default AssigneeIcon;
