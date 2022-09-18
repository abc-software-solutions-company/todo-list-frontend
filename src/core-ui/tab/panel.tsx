import React, {FC, ReactNode} from 'react';

import {useTabs} from './tabs';

export interface IPanelProps {
  children: ReactNode;
  label: string;
}

export const Panel: FC<IPanelProps> = ({children, label}) => {
  const {activeTab} = useTabs();
  return activeTab === label ? <div className="tab-content">{children}</div> : null;
};
