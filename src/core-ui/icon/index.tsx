import React from 'react';

import {IconSize} from '../types';

interface IProps {
  className?: string;
  name: string;
  size?: IconSize;
}

const Icon: React.FC<IProps> = ({className, name, size = 20}) => {
  return <i className={['abc-icon', className, name, `size-${size}`].filter(x => !!x).join(' ')}></i>;
};

export default Icon;
