import cls from 'classnames';
import React, {FC} from 'react';
import {CSSTransition} from 'react-transition-group';

interface IProps {
  className?: string;
  open: boolean;
  timeout?: number;
  onClick?: () => void;
}

const Backdrop: FC<IProps> = ({className, open, timeout = 300, onClick}) => {
  return (
    <CSSTransition in={open} timeout={timeout}>
      <div className={cls('abc-backdrop', className)} onClick={onClick}></div>
    </CSSTransition>
  );
};

export default Backdrop;
