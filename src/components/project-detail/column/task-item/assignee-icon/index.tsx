import classNames from 'classnames';
import {FC, HTMLAttributes} from 'react';

import Icon from '@/core-ui/icon';
import {shortName} from '@/utils/function';

interface IAssigneeIconProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  bg?: string;
}

const AssigneeIcon: FC<IAssigneeIconProps> = ({name, bg = 'bg-slate-200', ...rest}) => {
  return (
    <div
      {...rest}
      className={classNames(
        bg,
        'flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-full text-xs font-semibold text-white lg:h-8 lg:w-8'
      )}
    >
      {name ? shortName(name) : <Icon name="ico-plus" className="font-medium text-[#64748B]" size={16} />}
    </div>
  );
};

export default AssigneeIcon;
