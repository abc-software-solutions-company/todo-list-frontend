import SettingSidebar from '@/components/setting/setting-sidebar';
import React, {FC, useEffect, useState} from 'react';

import AccountSetting from '@/components/setting/account';
import GeneralSetting from '@/components/setting/general';
import AdvancedSetting from '@/components/setting/advanced';
import ThemeSetting from '@/components/setting/theme';

interface ISettingProps {
  className?: string | undefined;
}

const Setting: FC<ISettingProps> = ({className}) => {
  const [settingView, setSettingView] = useState<'ACCOUNT' | 'GENERAL' | 'ADVANCED' | 'THEME'>('ACCOUNT');

  return (
    <div className={className}>
      <SettingSidebar activeId={settingView} setSettingView={setSettingView} />
      <div className="ml-[25px] flex gap-10">
        {settingView === 'ACCOUNT' && <AccountSetting />}
        {settingView === 'GENERAL' && <GeneralSetting />}
        {settingView === 'ADVANCED' && <AdvancedSetting />}
        {settingView === 'THEME' && <ThemeSetting />}
      </div>
    </div>
  );
};

export default Setting;
