import React, {FC, ReactNode} from 'react';
import cls from 'classnames';

export interface ITabItemsProps {
  className?: string;
  children: ReactNode;
}

export const Items: FC<ITabItemsProps> = ({className, children}) => {
  return <div className={cls('tab-items', className)}>{children}</div>;
};
