import classNames from 'classnames';
import {FC} from 'react';

import Icon from '@/core-ui/icon';
import {IconSize} from '@/core-ui/types';

interface IssueTypeIconProps {
  icon?: string;
  iconSize?: IconSize;
  bgColor?: string;
}

const IssueTypeIcon: FC<IssueTypeIconProps> = ({icon, iconSize = 16, bgColor}) => {
  if (!icon) return null;

  return (
    <p className={classNames('relative h-6 w-6 rounded', bgColor)}>
      <Icon
        name={icon}
        size={iconSize}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
      />
    </p>
  );
};

export default IssueTypeIcon;
