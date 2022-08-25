import React from 'react';

import Icon from '../icon';
import {IIconSizeProps} from '../types';

interface IProps extends IIconSizeProps {
  className?: string;
  icon: string;
  onClick?: () => void;
}

const IconButton: React.FC<IProps> = ({className, icon, onClick, size = 24}) => {
  return (
    <button className={['icon-btn', className].join(' ')} onClick={onClick}>
      <Icon name={icon} size={size} />
    </button>
  );
};

export default IconButton;
