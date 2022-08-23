import cn from 'classnames';
import React, {ReactNode} from 'react';

import {IPropsButtonBase} from '@/types';

import styles from './style.module.scss';

interface IProps extends IPropsButtonBase {
  text?: string;
  children?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<IProps> = ({text, onClick, className, children, type = 'button', theme = 'blue'}) => {
  const content = children ? children : text;
  return (
    <>
      <button type={type} onClick={onClick} className={cn(styles['com-button'], className, styles[theme + ''])}>
        {content}
      </button>
    </>
  );
};

export default Button;
