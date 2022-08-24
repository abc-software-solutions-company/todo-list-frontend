import React, {InputHTMLAttributes, ReactNode} from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  children?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant: 'contained' | 'outlined';
}

const Button: React.FC<IProps> = ({text, onClick, className, children, type = 'button', variant = 'contained'}) => {
  const content = children ? children : text;
  return (
    <>
      <button type={type} onClick={onClick} className={['btn', className?.toString(), variant].join(' ')}>
        {content}
      </button>
    </>
  );
};

export default Button;
