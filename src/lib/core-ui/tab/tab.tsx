import cls from 'classnames';
import React, {FC, ReactNode} from 'react';

import {useTabs} from './tabs';

export interface ITabProps {
  className?: string;
  children: ReactNode;
  label: string;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  disabled?: boolean;
}

export const Tab: FC<ITabProps> = ({className, label, disabled, startIcon, endIcon, children}) => {
  const {activeTab, setActiveTab} = useTabs();

  return (
    <div className={cls('tab-item', className, activeTab === label && 'active')}>
      <button type="button" onClick={() => setActiveTab(label)} disabled={disabled}>
        {startIcon && <span className="icon mr-2">{startIcon}</span>}
        <span>{children}</span>
        {endIcon && <span className="icon ml-2">{endIcon}</span>}
      </button>
    </div>
  );
};
