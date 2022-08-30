import React, {createContext, FC, ReactNode, useContext, useMemo, useState} from 'react';
import cls from 'classnames';

import {Tab, ITabProps} from './tab';
import {Items, ITabItemsProps} from './items';
import {Panel, IPanelProps} from './panel';

interface ITabsContext {
  activeTab: string;
  setActiveTab: (label: string) => void;
}

interface ITabsComposition {
  Tab: FC<ITabProps>;
  Items: FC<ITabItemsProps>;
  Panel: FC<IPanelProps>;
}

interface ITabsProps {
  className?: string;
  active: string;
  children: ReactNode;
}

const TabsContext = createContext<ITabsContext | undefined>(undefined);

const Tabs: FC<ITabsProps> & ITabsComposition = ({className, children, active = ''}) => {
  const [activeTab, setActiveTab] = useState<string>(active);
  const memoizedContextValue = useMemo(() => ({activeTab, setActiveTab}), [activeTab, setActiveTab]);

  return (
    <TabsContext.Provider value={memoizedContextValue}>
      <div className={cls('abc-tab', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const useTabs = (): ITabsContext => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('This component must be used within a <Tabs> component.');
  return context;
};

Tabs.displayName = 'AITab';

Tabs.Tab = Tab;
Tabs.Items = Items;
Tabs.Panel = Panel;

export {Tabs};
