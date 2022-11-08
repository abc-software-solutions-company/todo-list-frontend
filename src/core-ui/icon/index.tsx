import cls from 'classnames';
import React, {FC, HTMLAttributes} from 'react';

import {IconSize} from '../types';

interface IProps {
  className?: string;
  name: string;
  size?: IconSize;
  onClick?: () => void;
  style?: HTMLAttributes<HTMLElement>;
}

const Icon: FC<IProps> = ({className, name, size = 24, onClick, style}) => {
  return <i className={cls('abc-icon', className, name, `size-${size}`)} onClick={onClick} style={style}></i>;
};

export default Icon;
