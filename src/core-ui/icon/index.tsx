import React, {InputHTMLAttributes} from 'react';

interface IProps extends InputHTMLAttributes<HTMLElement> {
  size?: 16 | 22 | 24 | 29 | 32 | 48;
}

const Button: React.FC<IProps> = ({className, size = 16}) => {
  return (
    <>
      <i className={['abc-icon', className, `abc-${size}`].join(' ')}></i>
    </>
  );
};

export default Button;
