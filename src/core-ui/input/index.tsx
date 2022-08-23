import React, {ReactNode} from 'react';
import cn from 'classnames';

import styles from './style.module.scss';

interface IProps {
  className?: string;
  placeholder?: string;
  type?: 'text' | 'button' | 'checkbox' | 'date' | 'file' | 'submit' | 'email';
  onClick?: () => void;
}

const Input: React.FC<IProps> = ({className, placeholder, type, onClick}) => {
  return <input className={cn(styles['com-input'], className)}  onClick={onClick} type={type} placeholder={placeholder} />;
};

export default Input;
