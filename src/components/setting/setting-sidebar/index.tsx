import SettingButton from '@/components/setting/setting-sidebar/setting-button';
import React, {FC} from 'react';

interface ISettingSidebarProps {
  className?: string;
  activeId: string;
  setSettingView: React.Dispatch<React.SetStateAction<'ACCOUNT' | 'GENERAL' | 'ADVANCED' | 'THEME'>>;
}

const SettingSidebar: FC<ISettingSidebarProps> = ({className, activeId, setSettingView}) => {
  return (
    <div className={`${className} mt-[18px] ml-6 mb-7 flex`}>
      <SettingButton
        activeId={activeId}
        id="ACCOUNT"
        ico="user"
        title="Account"
        setSettingView={() => setSettingView('ACCOUNT')}
      />
      <SettingButton
        activeId={activeId}
        id="GENERAL"
        ico="settings"
        title="General"
        setSettingView={() => setSettingView('GENERAL')}
      />
      <SettingButton
        activeId={activeId}
        id="ADVANCED"
        ico="sliders-horizontal"
        title="Advanced"
        setSettingView={() => setSettingView('ADVANCED')}
      />
      <SettingButton
        activeId={activeId}
        id="THEME"
        ico="palette"
        title="Theme"
        setSettingView={() => setSettingView('THEME')}
      />
    </div>
  );
};

export default SettingSidebar;
