import React from 'react';

import {IIconSizeProps} from '../types';

interface IProps extends IIconSizeProps {
  className?: string;
  name: string;
}

const Icon: React.FC<IProps> = ({className, name, size = 24}) => {
  return (
    <>
      <i className={['abc-icon', className, name, `size-${size}`].join(' ')}></i>
    </>
  );
};

export default Icon;
