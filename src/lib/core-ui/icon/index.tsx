import cls from 'classnames';
import React, {FC} from 'react';

import {IconSize} from '../types';

interface IProps {
  className?: string;
  name: string;
  size?: IconSize;
  onClick?: () => void;
}

const Icon: FC<IProps> = ({className, name, size = 24, onClick}) => {
  return <i className={cls('abc-icon', className, name, `size-${size}`)} onClick={onClick}></i>;
};

export default Icon;
