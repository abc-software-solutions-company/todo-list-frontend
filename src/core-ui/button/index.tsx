import React, {ReactNode} from 'react';
import cn from 'classnames';
import styles from './style.module.scss';
import {IPropsButtonBase} from '@/types';

interface IProps extends IPropsButtonBase {
  text?: string;
  children?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<IProps> = ({text, onClick, className, children, type = 'button', theme = 'blue'}) => {
  let content = children ? children : text;
  return (
    <>
      <button type={type} onClick={onClick} className={cn(styles['com-button'], className, styles[theme + ''])}>
        {content}
      </button>
    </>
  );
};

export default Button;
