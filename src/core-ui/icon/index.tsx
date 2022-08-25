import React, {InputHTMLAttributes} from 'react';

interface IProps extends InputHTMLAttributes<HTMLElement> {
  size?: 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48;
}

const Button: React.FC<IProps> = ({className, size = 24}) => {
  return (
    <>
      <i className={['abc-icon', className, `size-${size}`].join(' ')}></i>
    </>
  );
};

export default Button;
